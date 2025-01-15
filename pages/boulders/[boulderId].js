import React from "react";
import { useRouter } from "next/router";
import BoulderDetails from "@/components/BoulderDetails/BoulderDetails";

const BoulderPage = () => {
  const router = useRouter();
  const { boulderId } = router.query;

  return <BoulderDetails boulderId={boulderId} />;
};

export default BoulderPage;
