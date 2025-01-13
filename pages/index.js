import React from "react";
import Header from "../components/Header/Header";
import withAuth from "../components/Auth/withAuth";

const FrontPage = () => {
  return (
    <div>
      <Header />
      <div>Welcome to the Home Page</div>
    </div>
  );
};

export default withAuth(FrontPage);
