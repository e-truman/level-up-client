import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGameTypes, getGameById } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setGame] = useState({})
    const editMode = gameId ? true : false  // true or false

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    // const [currentGame, setCurrentGame] = useState({})
        // skillLevel: 1,
        // numberOfPlayers: 0,
        // title: "",
        // maker: "",
        // gameTypeId: 0
    

    useEffect(() => {
        if (editMode) {
            getGameById(parseInt(gameId)).then((res) => {
                setGame({
                    skillLevel: res.skill_level,
                    numberOfPlayers: res.number_of_players,
                    title: res.title,
                    maker: res.maker,
                    gameTypeId: res.game_type_id
                }
                )
            })
        }
        getGameTypes().then(gameTypesData => setGameTypes(gameTypesData))
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
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
                    // PUT
                    updateGame({
                        skillLevel: game.skillLevel,
                        numberOfPlayers: game.numberOfPlayers,
                        title: game.title,
                        maker: game.maker,
                        gameTypeId: game.gameTypeId
                    })
                        .then(() => history.push("/games"))
                } else {
                    // POST
                    addGame({
                        skillLevel: game.skillLevel,
                        numberOfPlayers: game.numberOfPlayers,
                        title: game.title,
                        maker: game.maker,
                        gameTypeId: game.gameTypeId
                    })
                        .then(() => history.push("/games"))
                }
            }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
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

                        <option value={editMode ? game.game_type_id : "0"}>Select a Game Type</option>
                        {
                            gameTypes.map(type => (
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


            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    constructNewGame()

                    // const game = {
                    //     maker: game.maker,
                    //     title: currentGame.title,
                    //     numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    //     skillLevel: parseInt(currentGame.skillLevel),
                    //     gameTypeId: parseInt(currentGame.gameTypeId)
                    // }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">{editMode ? "Save Updates" : "Create"}</button>
        </form>
    )
}
