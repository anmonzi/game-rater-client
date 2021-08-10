import React, { useState, useContext, useEffect } from 'react'
import { RatingContext } from './RatingProvider'
import { useHistory, useParams } from 'react-router'


export const Rating = () => {
    const { createRating } = useContext(RatingContext)
    const history = useHistory()
    const {gameId} = useParams()
    const currentUser = localStorage.getItem("lu_token") // can we even do this still?

    const [rating, setRating] = useState({
        rating: 0,
        game: gameId,
        player: currentUser
    })

    const handleUserInput = (event) => {
        const newRating = {...rating}
        newRating[event.target.name] = event.target.value
        setRating(newRating)
    }

    

    return (
        <>
            <div>
                <h3>Rate Game 0 - 10</h3>
                <input 
                type="range"
                name="rating"
                min="0"
                max="10"
                required
                autoFocus
                value={rating.rating}
                onChange={handleUserInput}/>
                <div>
                    <button 
                    className="btn btn-2"
                    type="submit"
                    onClick={(event) => {
                        event.preventDefault()
                        createRating(rating)
                        window.location.reload()
                    }}
                    >Submit Rating
                    </button>
                </div>
            </div>
        </>
    )
}