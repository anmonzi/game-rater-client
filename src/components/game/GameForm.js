import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from './GameProvider'
import { CategoryContext } from '../category/CategoryProvider'
import { useHistory } from 'react-router'
import "./Game.css"


export const GameForm = () => {
    const { createGame } = useContext(GameContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const history = useHistory()
    const currentUser = localStorage.getItem("lu_token") // can we even do this still?

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
   const [ currentGame, setCurrentGame ] = useState({
       title: "",
       description: "",
       designer: "",
       year_released: "",
       number_of_players: 0,
       game_time: "",
       age_rec: 0,
       categories: [],
       player: currentUser
   })

   useEffect(() => {
        getCategories()
   }, [])

   const handleUserInput = (event) => {
       const newGameState = {...currentGame}
       newGameState[event.target.name] = event.target.value
       setCurrentGame(newGameState)
   }

   const handleSaveGame = (event) => {
       event.preventDefault()

       const game = {
           title: currentGame.title,
           description: currentGame.description,
           designer: currentGame.designer,
           year_released: currentGame.year_released,
           number_of_players: parseInt(currentGame.number_of_players),
           game_time: parseInt(currentGame.game_time),
           age_rec: parseInt(currentGame.age_rec),
           categories: currentGame.categories,
           player: currentUser
       }
       // Send POST request to your API
       createGame(game)
        .then(() => history.push("/games"))
   }


   return (
     <form className="gameForm">
       <h2 className="gameForm__title">Register New Game</h2>
       <fieldset>
         <div className="form-group">
           <label htmlFor="title">Title: </label>
           <input
             type="text"
             name="title"
             required
             autoFocus
             className="form-control"
             value={currentGame.title}
             onChange={handleUserInput}
           />
         </div>
       </fieldset>
       <fieldset>
         <div className="form-group">
           <label htmlFor="title">Description: </label>
           <textarea
             type="text"
             name="description"
             required
             autoFocus
             className="form-control"
             value={currentGame.description}
             onChange={handleUserInput}
           />
         </div>
       </fieldset>
       <fieldset>
         <div className="form-group">
           <label htmlFor="title">Designer: </label>
           <input
             type="text"
             name="designer"
             required
             autoFocus
             className="form-control"
             value={currentGame.designer}
             onChange={handleUserInput}
           />
         </div>
       </fieldset>
       <fieldset>
         <div className="form-group">
           <label htmlFor="title">Year Released: </label>
           <input
             type="date"
             name="year_released"
             required
             autoFocus
             className="form-control"
             value={currentGame.year_released}
             onChange={handleUserInput}
           />
         </div>
       </fieldset>
       <fieldset>
         <div className="form-group">
           <label htmlFor="title">Number of Players: </label>
           <input
             name="number_of_players"
             type="number"
             required
             autoFocus
             className="form-control"
             value={currentGame.number_of_players}
             onChange={handleUserInput}
           />
         </div>
       </fieldset>
       <fieldset>
         <div className="form-group">
           <label htmlFor="title">Estimated Game Time: </label>
           <input
             type="number"
             name="game_time"
             required
             autoFocus
             className="form-control"
             value={currentGame.game_time}
             onChange={handleUserInput}
           />
         </div>
       </fieldset>
       <fieldset>
         <div className="form-group">
           <label htmlFor="title">Age Reccomendation: </label>
           <input
             type="number"
             name="age_rec"
             required
             autoFocus
             className="form-control"
             value={currentGame.age_rec}
             onChange={handleUserInput}
           />
         </div>
       </fieldset>
       <fieldset>
         <div className="form-group">
           <label htmlFor="title">Game Category: </label>
           <select
             name="categories"
             required
             autoFocus
             className="form-control"
             value={currentGame.categories}
             onChange={handleUserInput}
           >
             <option value="0">Select a Category</option>
             {categories.map(cat => 
               <option key={cat.id} value={cat.id}>
                 {cat.label}
               </option>
             )}
           </select>
         </div>
       </fieldset>
       <button
         type="submit"
         onClick={handleSaveGame}
         className="btn btn-primary"
       >
         Create
       </button>
     </form>
   );
}