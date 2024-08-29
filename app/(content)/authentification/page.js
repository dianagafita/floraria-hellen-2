import AuthForm from "./auth _form";

export default function AuthFormPage({ searchParams }) {
  const formMode = searchParams.mode || "login";
  console.log(formMode);
  return <AuthForm mode={formMode} />;
}
