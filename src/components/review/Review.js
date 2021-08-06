import React, { useState, useContext, useEffect } from 'react'
import { ReviewConext } from './ReviewProvider'
import { useHistory, useParams } from 'react-router'


export const Review = () => {
    const { getReviewsByGameId } = useContext(ReviewConext)
    const [reviews, setReviews] = useState([])
    const history = useHistory()
    const {gameId} = useParams()

    useEffect(() => {
        getReviewsByGameId(gameId).then(reviews => setReviews(reviews))
    }, [gameId])

    return (
        <div>{
            reviews.map(review => 
                <>
                    <div>• {review.review}</div>
                    <br></br>
                </>
                )}
        </div>
    )

}