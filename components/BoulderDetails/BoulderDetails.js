import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button";
import BetaList from "@/components/BetaList/BetaList";
import styles from "./styles.module.css";

const BoulderDetails = () => {
  const router = useRouter();
  const { boulderId } = router.query;
  const [boulder, setBoulder] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [showBeta, setShowBeta] = useState(false);
  const [loading, setLoading] = useState(true);
  const [betas, setBetas] = useState([]);
  const [completedByNames, setCompletedByNames] = useState([]);
  useEffect(() => {
    const token = cookie.get("jwt_token");
    const userId = cookie.get("user_id");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (!boulderId) return;

    console.log("🟢 Fetching Boulder Data for ID:", boulderId);

    // ✅ Fetch Boulder Details
    axios
      .get(`http://localhost:3002/boulders/${boulderId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log("✅ Boulder Data Received:", res.data);
        setBoulder(res.data);

        console.log("🔹 Created By (Boulder):", res.data.createdBy);
        console.log("🔹 Logged-in User ID:", userId);

        // ✅ Check if the logged-in user has completed this boulder
        setCompleted(res.data.completedBy.includes(userId));

        // ✅ Fetch user names of those who completed this boulder
        if (res.data.completedBy.length > 0) {
          fetchUserNames(res.data.completedBy);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        setLoading(false);
      });
  }, [boulderId]);

  const fetchBetas = async () => {
    const token = cookie.get("jwt_token");

    try {
      const response = await axios.get(
        `http://localhost:3002/boulders/${boulderId}/beta`,
        { headers: { Authorization: token } }
      );
      setBetas(response.data.betas || []); // ✅ Ensure betas update correctly
    } catch (err) {
      console.error(
        "❌ Error fetching betas:",
        err.response?.data || err.message
      );
      setBetas([]); // Prevents undefined errors
    }
  };

  const toggleBeta = () => {
    setShowBeta(!showBeta);

    // Fetch betas only when showing the section
    if (!showBeta) {
      fetchBetas();
    }
  };

  const fetchUserNames = async (userIds) => {
    if (!userIds || userIds.length === 0) return;

    try {
      const response = await axios.post("http://localhost:3002/users/names", {
        userIds,
      });

      setCompletedByNames(response.data.names || []); // ✅ Store names in state
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  const toggleCompleted = async () => {
    const token = cookie.get("jwt_token");
    const userId = cookie.get("user_id");

    try {
      const response = await axios.put(
        `http://localhost:3002/boulders/${boulderId}/completed`,
        {},
        { headers: { Authorization: token } }
      );

      setCompleted(response.data.completedBy.includes(userId));
      fetchUserNames(response.data.completedBy);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  const handleLikeDislike = async (betaId, action) => {
    const token = cookie.get("jwt_token");

    try {
      const response = await axios.put(
        `http://localhost:3002/boulders/${boulderId}/beta/${betaId}/like-dislike`,
        { action }, // ✅ Pass action as "like" or "dislike"
        { headers: { Authorization: token } }
      );
      setBetas((prevBetas) =>
        prevBetas.map((beta) =>
          beta.id === betaId
            ? {
                ...beta,
                likes: response.data.beta.likes,
                dislikes: response.data.beta.dislikes,
              }
            : beta
        )
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  const handleDeleteBoulder = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this boulder?"
    );
    if (!isConfirmed) return;

    const token = cookie.get("jwt_token");

    try {
      const response = await axios.delete(
        `http://localhost:3002/boulders/${boulderId}`,
        { headers: { Authorization: token } }
      );
      router.push("/boulders");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!boulder) {
    return <p>Boulder not found</p>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <h1>{boulder.name}</h1>
      <img src={boulder.picture} alt={boulder.name} className={styles.image} />
      <p>
        <strong>Difficulty:</strong> {boulder.difficulty}
      </p>
      <p>
        <strong>Gym:</strong> {boulder.gym}
      </p>
      <p>
        <strong>Completed By:</strong>{" "}
        {completedByNames.length > 0
          ? completedByNames.join(", ")
          : "No one has completed this boulder yet."}
      </p>

      {/* ✅ Show Delete Button ONLY for the Boulder Creator */}
      {boulder &&
        boulder.createdBy &&
        boulder.createdBy === cookie.get("user_id") && (
          <Button onClick={handleDeleteBoulder} className={styles.deleteButton}>
            ❌ Delete Boulder
          </Button>
        )}

      <Button onClick={toggleCompleted} className={styles.completeButton}>
        {completed ? "✅ Unmark as Completed" : "✅ Mark as Completed"}
      </Button>
      <Button onClick={toggleBeta} className={styles.toggleButton}>
        {showBeta ? "Hide Beta" : "Show Beta"}
      </Button>
      {showBeta && <BetaList betas={betas} onLikeDislike={handleLikeDislike} />}
    </div>
  );
};

export default BoulderDetails;
