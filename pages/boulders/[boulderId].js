import React from "react";
import { useRouter } from "next/router";
import BoulderDetails from "@/components/BoulderDetails/BoulderDetails";
import Header from "@/components/Header/Header";

const BoulderPage = () => {
  const router = useRouter();
  const { boulderId } = router.query;

  return (
    <div>
      <Header />
      <BoulderDetails />
    </div>
  );
};

export default BoulderPage;
