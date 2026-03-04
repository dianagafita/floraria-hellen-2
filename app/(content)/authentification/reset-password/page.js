import ChangePasswordForm from "@/components/reset-password/change-password-form";
import ResetPasswordForm from "@/components/reset-password/reset-password-form";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const ResetPasswordPage = async ({ searchParams }) => {
  const params = await searchParams;
  if (params.token) {
    const user = await prisma.user.findUnique({
      where: {
        resetPasswordToken: params.token,
      },
    });
    if (!user) {
      redirect("/authentification/reset-password");
    }

    return <ChangePasswordForm resetPasswordToken={params.token} />;
  } else {
    return <ResetPasswordForm />;
  }
};

export default ResetPasswordPage;
