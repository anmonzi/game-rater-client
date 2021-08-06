import React, { useState, createContext } from 'react'

export const GameContext = createContext()


export const GameProvider = (props) => {
    const [games, setGames] = useState([])


    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
        .then(setGames)
    }


    const getGameById = gameId => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
        .then()
    }

    const createGame = gameObj => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(gameObj)
        })
        .then(getGames)
        .then()
    }


    return (
        <GameContext.Provider value={
            {
                games, getGames, getGameById, createGame
            }
        }>
            {props.children}
        </GameContext.Provider>
    )
}