import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { GameContext } from './GameProvider'
import { Review } from '../review/Review'
import "./Game.css"


export const GameDetail = () => {
    const { getGameById } = useContext(GameContext)
    const [game, setGame] = useState({})
    const history = useHistory()
    const {gameId} = useParams()

    useEffect(() => {
        getGameById(gameId).then(game => setGame(game))
    }, [gameId])


    
    return (
        <>
            <h2>{game.title}'s Overview</h2>
            <h4>Designed by: {game.designer}</h4>
            <div>Description:</div>
            <div>{game.description}</div>
            <br></br>
            <div>Year realeased: {game.year_released}</div>
            <div>Number of players: {game.number_of_players}</div>
            <div>Estimated time of play: {game.game_time} minutes</div>
            <div>Age Recommendation: {game.age_rec} years or older</div>
            <br></br>
            <div>Categories: {
                    game.categories?.map(c => 
                        <div>{ c.label }</div>
                    )}
            </div>
            <button className="btn" onClick={() => history.push(`/games/${gameId}/review`)}>Review Game</button>
            <br></br>
            <h4>Current reviews of this game</h4>
            <Review />
            <button className="btn" onClick={() => history.push("/games")}>Go Back</button>
        </>
    )
}