import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { GameContext } from './GameProvider'
import { Link } from "react-router-dom"
import "./Game.css"


export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()
    const currentUser = localStorage.getItem("lu_token") // can we even do this still?

    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
            <div className="game_list_container">
                <header className="game_header">
                    <h1>Current Games at Game Rater</h1>
                    <button className="btn btn-2 btn-sep icon-create" onClick={() => {
                        history.push("/games/new")
                    }}>Add New Game</button>
                </header>
                <br></br>
                <div className="game_list">
                    {
                        games.map(game => {
                            return <section key={`game--${game.id}`} className="game">
                                <Link className="game__link" to={`/games/detail/${game.id}`}>{game.title}</Link>
                            </section>
                        })
                    }
                </div>

            </div>
        </>
    )
}