"use client";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/util/button";
import Input from "@/components/util/input";
import Title from "@/components/util/title";
import { updatePassword, updateUser } from "@/actions/user-actions";
import "@/app/globals.css";
import ProfileMenuDrawer from "@/components/profile/profile-menu-drawer";

const showToast = (type, message) => {
  const config = {
    className: `toast-${type}-message`,
    position: "bottom-right",
    theme: "colored",
  };
  type === "success"
    ? toast.success(message, config)
    : toast.error(message, config);
};

const useUserData = (setUser, setInitialUserData) => {
  const fetchUserData = async () => {
    const response = await fetch("/api/valid");
    const data = await response.json();
    if (data.userId) {
      const userResponse = await fetch(`/api/user/${data.userId}`);
      const userData = await userResponse.json();
      setUser(userData);
      setInitialUserData(userData);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return fetchUserData;
};

const PersonalDataPage = () => {
  const [user, setUser] = useState(null);
  const [initialUserData, setInitialUserData] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [formState, formAction] = useFormState(updateUser, {});
  const [secondFormState, secondFormAction] = useFormState(
    updatePassword.bind(null, user?.email),
    {}
  );

  useUserData(setUser, setInitialUserData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    if (initialUserData && value !== initialUserData[name]) {
      setIsFormChanged(true);
    } else if (
      initialUserData &&
      value === initialUserData[name] &&
      !Object.keys(user).some((key) => user[key] !== initialUserData[key])
    ) {
      setIsFormChanged(false);
    }
  };

  useEffect(() => {
    showToast(formState.success ? "success" : "error", formState.message);
    if (formState.success) {
      setTimeout(() => {
        window.location.reload();
      }, 8000);
    }
  }, [formState]);

  useEffect(() => {
    console.log(secondFormState);
    showToast(
      secondFormState.success ? "success" : "error",
      secondFormState.message
    );
  }, [secondFormState]);

  return (
    <>
      {user && <ProfileMenuDrawer user={user} />}
      <div className="flex flex-col md:flex-row p-5 w-full mt-5 mb-10">
        <ToastContainer />
        <div className="mb-9 md:mb-0 flex flex-col w-full py-5 px-2 md:mx-2 text-center border rounded">
          <Title>
            DATE PERSONALE
            <span className="flex text-[12px] md:text-sm text-[rgba(0,0,0,0.5)]">
              Editeaza datele personale asociate contului tau
            </span>
          </Title>
          <form
            className="flex flex-col items-center text-start"
            action={formAction}
          >
            <input type="hidden" name="id" value={user?.id} />
            <div className="flex flex-col lg:flex-row w-full">
              <Input
                name="firstName"
                label="Prenume"
                defaultValue={user?.first_name}
                onChange={handleInputChange}
              />
              <Input
                name="secondName"
                label="Nume"
                defaultValue={user?.second_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-row md:flex-col lg:flex-row lg:flex w-full">
              <Input
                name="email"
                label="Email"
                defaultValue={user?.email}
                onChange={handleInputChange}
              />
              <Input
                name="phone"
                label="Telefon"
                defaultValue={user?.phone}
                onChange={handleInputChange}
              />
            </div>
            <Button
              moreStyle="w-[50%] md:w-[90%] lg:w-[50%] items-center mt-10"
              disabled={!isFormChanged}
            >
              Salveaza
            </Button>
          </form>
        </div>
        <div className="pb-10 mb-9 md:mb-0 flex flex-col w-full py-5 px-2 md:mx-2 text-center border rounded">
          <Title>
            SCHIMBA PAROLA
            <span className="flex text-[12px] md:text-sm text-[rgba(0,0,0,0.5)]">
              Editeaza parola asociata contului tau
            </span>
          </Title>
          <form
            className="flex flex-col items-center text-start w-full"
            action={secondFormAction}
          >
            <input type="hidden" name="id" value={user?.id} />
            <div className="flex flex-col  lg:flex-row w-full">
              <Input
                name="currentPassword"
                label="Parola veche"
                type="password"
              />
              <div className="flex flex-col md:flex-row  w-full">
                <Input name="newPassword" label="Parola noua" />
                <Input name="confirmNewPassword" label="Confirma parola noua" />
              </div>
            </div>
            <Button moreStyle="w-[50%] lg:w-[50%] md:w-[90%] mx-auto md:mt-[128px] mt-10">
              Schimba parola
            </Button>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default PersonalDataPage;
