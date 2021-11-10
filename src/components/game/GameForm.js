import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGameTypes, getGameById, updateGame } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setGame] = useState({})
    const editMode = gameId ? true : false  // true or false


    useEffect(() => {
        if (editMode) {
            getGameById(parseInt(gameId)).then((res) => {
                setGame({
                    id: res.id,
                    skillLevel: res.skill_level,
                    numberOfPlayers: res.number_of_players,
                    title: res.title,
                    maker: res.maker,
                    gameTypeId: res.game_type.id
                }
                )
            })
        }
        getGameTypes().then(gameTypesData => setGameTypes(gameTypesData))
    }, [])

 
        const handleControlledInputChange = (event) => {
            /*
                When changing a state object or array, always create a new one
                and change state instead of modifying current one
            */
            const newGameState = Object.assign({}, game)          // Create copy
            newGameState[event.target.name] = event.target.value 
               // Modify copy
            setGame(newGameState)                                 // Set copy as new state
        }

        const constructNewGame = () => {
            // debugger
                if (editMode) {
                    // PUT: 
                    updateGame({
                        id: game.id,
                        skillLevel: game.skillLevel,
                        numberOfPlayers: game.numberOfPlayers,
                        title: game.title,
                        maker: game.maker,
                        gameTypeId: parseInt(game.gameTypeId)
                    })
                        .then(() => history.push("/games"))
                } else {
                    // POST
                    createGame({
                        skillLevel: game.skillLevel,
                        numberOfPlayers: game.numberOfPlayers,
                        title: game.title,
                        maker: game.maker,
                        gameTypeId: parseInt(game.gameTypeId)
                    })
                        .then(() => history.push("/games"))
                }
            }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">{editMode ? "Edit Game" : "Register New Game"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        // defaultValue={game.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        // defaultValue={game.maker}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers"   min="1" max="100"required autoFocus className="form-control"
                        value={game.numberOfPlayers}
                        // value={game.numberOfPlayers}
                        // defaultValue={game.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={game.gameTypeId}
                        // defaultValue={game.gameTypeId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a Game Type</option>
                        {
                            gameTypes.map(type => (
                                type.id == game.gameTypeId ? <option selected key={type.id} value={type.id}>
                                {type.label}  </option>: 
                                <option key={type.id} value={type.id}>
                                    {type.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Skill Level: </label>
                    <input type="number" name="skillLevel"  min="1" max="10" required autoFocus className="form-control"
                        defaultValue="Please Enter a Number"
                        value={game.skillLevel}
                        // defaultValue={game.skillLevel}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewGame()
                }}
                className="btn btn-primary">{editMode ? "Save Updates" : "Create"}</button>
        </form>
    )
}
