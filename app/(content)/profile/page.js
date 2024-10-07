import { getUserById } from "@/app/api/store/user";
import OrderItem from "@/components/orders/order-item";
import ProfileMenuDrawer from "@/components/profile/profile-menu-drawer";
import { verifyAuth } from "@/lib/auth";
import Loading from "@/lib/loading";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  let userdata;
  const { user } = await verifyAuth();
  if (user) {
    userdata = await getUserById(user.id);
  }
  if (!user) {
    redirect("/authentification");
  }

  return (
    <>
      {user ? (
        <>
          <ProfileMenuDrawer user={userdata} />
          <div className="flex flex-col items-center mt-10 p-5 my-5 w-full min-h-[700px]">
            <div className="flex flex-col items-center w-full text-center">
              <span className="font-[400] text-4xl mb-10 uppercase">
                BUNA, <span className="">{userdata.second_name}</span>
              </span>
              <div className="flex flex-col md:flex-row items-center justify-center w-full ">
                <div className="flex flex-col  w-full mb-10 max-w-[700px]">
                  <div className="flex mb-4 items-center">
                    <span className="mr-2 md:ml-2 lg:ml-7">
                      COMENZI RECENTE
                    </span>
                    <span className="mx-2 text-lg text-[rgb(0,0,0,0.4)] font-[100]">
                      |
                    </span>
                    <Link
                      href="/profile/orders"
                      className="text-[12px] font-[100] text-[rgb(0,0,0,0.4)]"
                    >
                      VEZI TOATE COMENZILE
                    </Link>
                  </div>
                  <OrderItem userId={user.id} mode="first" />
                </div>
                <div className="flex flex-col border rounded-sm h-fit w-full max-w-[700px] pr-5 pb-6 pt-7 pl-5">
                  <span className="text-start mb-[1.4rem]">
                    INFORMATIILE MELE
                  </span>
                  <div className="flex">
                    <span>
                      NUME:{" "}
                      <span className="text-[rgb(0,0,0,0.4)] mx-1">
                        {userdata.second_name} {userdata.first_name}
                      </span>
                    </span>
                  </div>
                  <div className="flex">
                    <span>
                      EMAIL:{" "}
                      <span className="ml-1 text-[rgb(0,0,0,0.4)]">
                        {userdata.email}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
