import React, { createContext, useState } from 'react'

export const RatingContext = createContext()

export const RatingProvider = (props) => {
  const [ratings, setRatings] = useState([]);

  const getRatingsByGameId = (gameId) => {
    return fetch(`http://localhost:8000/ratings?game=${gameId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
    .then((res) => res.json());
  };


  const getRatings = () => {
    return fetch("http://localhost:8000/ratings", {
        headers: {
          Authorization: `Token ${localStorage.getItem("lu_token")}`,
        },
      })
      .then((res) => res.json())
      .then(setRatings)
  }

  const createRating = ratingObj => {
    return fetch("http://localhost:8000/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(ratingObj),
    })
      .then(getRatings)
      .then();
  }


  return (
    <RatingContext.Provider
      value={{
        ratings,
        getRatings,
        getRatingsByGameId,
        createRating,
      }}
    >
      {props.children}
    </RatingContext.Provider>
  );
}