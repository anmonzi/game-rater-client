import React, { createContext, useState } from "react";

export const ReviewConext = createContext();

export const ReviewProvider = (props) => {
  const [reviews, setReviews] = useState([]);

  const getReviews = () => {
    return fetch("http://localhost:8000/reviews", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setReviews);
  };


  const getReviewsByGameId = gameId => {
    return fetch(`http://localhost:8000/reviews?game=${gameId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
    .then(res => res.json())
}


  const createReview = reviewObj => {
    return fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(reviewObj)
    })
    .then(getReviews)
    .then()
}

  return (
    <ReviewConext.Provider
      value={{
        reviews,
        getReviews,
        createReview,
        getReviewsByGameId
      }}
    >
      {props.children}
    </ReviewConext.Provider>
  );
};
