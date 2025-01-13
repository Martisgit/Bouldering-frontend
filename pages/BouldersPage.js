import React, { useEffect, useState } from "react";
import api from "../api/api"; // ✅ Import API
import BoulderItem from "../components/BoulderItem/BoulderItem"; // ✅ Import Boulder component

const BouldersPage = () => {
  const [boulders, setBoulders] = useState([]);

  useEffect(() => {
    api
      .get("/boulders")
      .then((response) => setBoulders(response.data.boulders))
      .catch((error) => console.error("Error fetching boulders:", error));
  }, []);

  return (
    <div>
      <h1>Boulders</h1>
      {boulders.map((boulder) => (
        <BoulderItem key={boulder.id} boulder={boulder} />
      ))}
    </div>
  );
};

export default BouldersPage;
