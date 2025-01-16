import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import Button from "@/components/Button/Button";
import BetaList from "@/components/BetaList/BetaList";
import BetaForm from "@/components/BetaForm/BetaForm";
import styles from "./styles.module.css";

import {
  fetchBoulderDetails,
  toggleBoulderCompletion,
  fetchBetas,
  likeOrDislikeBeta,
  deleteBoulder,
  deleteBeta,
  fetchUserNames,
} from "@/api/BoulderApi";

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

    const loadData = async () => {
      try {
        const boulderData = await fetchBoulderDetails(boulderId);
        setBoulder(boulderData);
        setCompleted(boulderData.completedBy.includes(userId));

        if (boulderData.completedBy.length > 0) {
          const names = await fetchUserNames(boulderData.completedBy);
          setCompletedByNames(names);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [boulderId]);

  const handleToggleBeta = async () => {
    if (!showBeta) {
      const betaData = await fetchBetas(boulderId);
      setBetas(betaData);
    }
    setShowBeta(!showBeta);
  };
  const handleBetaAdded = async () => {
    const betaData = await fetchBetas(boulderId);
    setBetas(betaData);
  };

  const handleToggleCompleted = async () => {
    const userId = cookie.get("user_id");

    try {
      const updatedData = await toggleBoulderCompletion(boulderId);
      setBoulder((prevBoulder) => ({
        ...prevBoulder,
        completedBy: [...updatedData.completedBy],
      }));
      setCompleted(updatedData.completedBy.includes(userId));
      const names = await fetchUserNames(updatedData.completedBy);
      setCompletedByNames(names);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLikeDislike = async (betaId, action) => {
    try {
      const updatedBeta = await likeOrDislikeBeta(boulderId, betaId, action);
      setBetas((prevBetas) =>
        prevBetas.map((beta) =>
          beta.id === betaId
            ? {
                ...beta,
                likes: updatedBeta.likes,
                dislikes: updatedBeta.dislikes,
              }
            : beta
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteBoulder = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this boulder?"
    );
    if (!isConfirmed) return;

    try {
      await deleteBoulder(boulderId);
      router.push("/boulders");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteBeta = async (betaId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this beta?"
    );
    if (!isConfirmed) return;

    try {
      await deleteBeta(boulderId, betaId);
      const betaData = await fetchBetas(boulderId);
      setBetas(betaData);
    } catch (err) {
      console.error(err.message);
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
          <span>Gym: {boulder.gym}</span>
        </p>
        <p>
          <span className={styles.completedBy}>
            Completed By:{" "}
            {boulder.completedBy && boulder.completedBy.length > 0
              ? completedByNames.join(", ")
              : "No one has completed this boulder yet."}
          </span>
        </p>
      </div>
      <Button onClick={handleToggleCompleted} className={styles.completeButton}>
        {completed ? "❌ Unmark as Completed" : "✅ Mark as Completed"}
      </Button>
      {boulder?.createdBy === cookie.get("user_id") && (
        <Button onClick={handleDeleteBoulder} className={styles.deleteButton}>
          ❌ Delete Boulder
        </Button>
      )}
      <Button onClick={handleToggleBeta} className={styles.showBetaButton}>
        {showBeta ? "🧗 Hide Beta" : "🧗 Show Beta"}
      </Button>
      {showBeta && (
        <div>
          <BetaList
            betas={betas}
            onLikeDislike={handleLikeDislike}
            onDeleteBeta={handleDeleteBeta}
          />
          <BetaForm boulderId={boulderId} onBetaAdded={handleBetaAdded} />
        </div>
      )}
    </div>
  );
};

export default BoulderDetails;
