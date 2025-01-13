/* eslint-disable react/display-name */
import { useEffect } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = cookie.get("jwt_token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
