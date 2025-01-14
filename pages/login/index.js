import Header from "@/components/Header/Header";
import LoginForm from "@/components/LoginForm/LoginForm";
import React from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  return (
    <div>
      <Header />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
