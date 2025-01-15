import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";
import Button from "@/components/Button/Button";
import BetaList from "@/components/BetaList/BetaList";
import BetaForm from "@/components/BetaForm/BetaForm";
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

    axios
      .get(`http://localhost:3002/boulders/${boulderId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setBoulder(res.data);

        setCompleted(res.data.completedBy.includes(userId));

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
      setBetas(response.data.betas || []);
    } catch (err) {
      console.error(
        "❌ Error fetching betas:",
        err.response?.data || err.message
      );
      setBetas([]);
    }
  };

  const toggleBeta = () => {
    setShowBeta(!showBeta);

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

      setCompletedByNames(response.data.names || []);
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

      setBoulder((prevBoulder) => ({
        ...prevBoulder,
        completedBy: [...response.data.completedBy],
      }));

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
        { action },
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
  const handleDeleteBeta = async (betaId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this beta?"
    );
    if (!isConfirmed) return;

    const token = cookie.get("jwt_token");

    try {
      await axios.delete(
        `http://localhost:3002/boulders/${boulderId}/beta/${betaId}`,
        { headers: { Authorization: token } }
      );

      fetchBetas();
    } catch (err) {
      console.error(
        "❌ Error deleting beta:",
        err.response?.data || err.message
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!boulder) {
    return <p>Boulder not found</p>;
  }

  return (
    <div className={styles.wrapper}>
      <h1>{boulder.name}</h1>
      <img src={boulder.picture} alt={boulder.name} className={styles.image} />
      <div className={styles.boulderDetails}>
        <p>
          <span>Difficulty: {boulder.difficulty}</span>
        </p>
        <p>
          <span>Gym: {boulder.gym} </span>
        </p>
        <p>
          <span className={styles.completedBy}>
            Completed By:{" "}
            {boulder.completedBy && boulder.completedBy.length > 0
              ? completedByNames.join(", ")
              : "No one has completed this boulder yet."}{" "}
          </span>
        </p>
      </div>
      <Button onClick={toggleCompleted} className={styles.completeButton}>
        {completed ? "❌ Unmark as Completed" : "✅ Mark as Completed"}
      </Button>
      {boulder &&
        boulder.createdBy &&
        boulder.createdBy === cookie.get("user_id") && (
          <Button onClick={handleDeleteBoulder} className={styles.deleteButton}>
            ❌ Delete Boulder
          </Button>
        )}
      <Button onClick={toggleBeta} className={styles.showBetaButton}>
        {showBeta ? "🧗 Hide Beta" : "🧗 Show Beta"}
      </Button>

      {showBeta && (
        <div>
          <BetaList
            betas={betas}
            onLikeDislike={handleLikeDislike}
            onDeleteBeta={handleDeleteBeta}
          />
          <BetaForm boulderId={boulderId} onBetaAdded={fetchBetas} />
        </div>
      )}
    </div>
  );
};

export default BoulderDetails;
