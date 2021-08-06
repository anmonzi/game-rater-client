import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ReviewConext } from './ReviewProvider'


export const ReviewForm = () => {
    const { createReview } = useContext(ReviewConext)
    const history = useHistory()
    const {gameId} = useParams()
    const currentUser = localStorage.getItem("lu_token") // can we even do this still?

    const [review, setReview] = useState({
        review: "",
        game: gameId,
        player: currentUser
    })

    const handleUserInput = (event) => {
        const newReview = {...review}
        newReview[event.target.name] = event.target.value
        setReview(newReview)
    }


    return (
      <form className="reviewForm">
        <h2 className="reviewForm__title">Add Your Review</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Review: </label>
            <textarea
              type="text"
              name="review"
              required
              autoFocus
              className="form-control"
              value={review.review}
              onChange={handleUserInput}
            />
          </div>
        </fieldset>
        <button className="btn" onClick={(event) => {
            event.preventDefault()
            createReview(review)
            history.push(`/games/detail/${gameId}`)
        }}>Add Review</button>
        <button className="btn" onClick={() => history.push(`/games/detail/${gameId}`)}>Go Back</button>
      </form>
    );

}