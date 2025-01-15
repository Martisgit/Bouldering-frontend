import React, { useEffect } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get("jwt_token");

    if (token) {
      router.replace("/boulders");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
};

export default IndexPage;
