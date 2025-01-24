/* eslint-disable react/display-name */
import { useEffect } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";

// open with authorization only

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = cookie.get("jwt_token");
      if (!token) {
        router.push("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
