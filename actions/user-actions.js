"use server";

import { updateUserData, updateUserPassword } from "@/app/api/store/user";

export async function updateUser(prevState, formData) {
  const firstName = formData.get("firstName");
  const secondName = formData.get("secondName");
  const email = formData.get("email");
  const phone = formData.get("phone");

  try {
    await updateUserData(firstName, secondName, email, phone);
    return { success: true, message: "Datele utilizator-ului actualizate!" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Nu s-a putut actualiza user-ul" };
  }
}

export async function updatePassword(email, prevState, formData) {
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmNewPassword = formData.get("confirmNewPassword");

  try {
    if (newPassword === confirmNewPassword) {
      await updateUserPassword(newPassword, email, currentPassword);
      return { success: true, message: "Parola schimbata cu succes!" };
    } else {
      return { success: false, message: "Parolele nu se potrivesc!" };
    }
  } catch (error) {
    console.error("Eroare la schimbarea parolei:", error);
    if (error.message === "Current password is incorrect") {
      return {
        success: false,
        message: "Parola curenta introdusa nu este corecta!",
      };
    }
    return { success: false, message: "Nu s-a putut schimba parola!" };
  }
}
