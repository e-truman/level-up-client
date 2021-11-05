import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createEvent } from './EventManager.js'
import { getGames} from '../game/GameManager'


export const EventForm = () => {
    const history = useHistory()
    const { eventId } = useParams()
    const [games, setGames] = useState([])
    const editMode = eventId ? true : false  // true or false

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        gameId: 0,
        organizerId: parseInt(localStorage.getItem("lu_token")),
        description: "",
        date: "",
        time: 0
    })

    useEffect(() => {
        if (editMode) {
            getEventById(parseInt(eventId)).then((res) => {
                setEvent(res)
            })
        }
        getGames().then(gameData => setGames(gameData))
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
            const newEventState = Object.assign({}, currentEvent)          // Create copy
            newEventState[event.target.name] = event.target.value 
               // Modify copy
            setCurrentEvent(newEventState)                                 // Set copy as new state
        }

        


    // const changeGameTitleState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.title = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameMakerState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.maker = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGamePlayersState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.numberOfPlayers = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameSkillLevelState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.skillLevel = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameTypeState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.gameTypeId = event.target.value
    //     setCurrentGame(newGameState)
    // }
    /* REFACTOR CHALLENGE END */


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventTypeId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a Game</option>
                        {
                            games.map(g => (
                                <option key={g.id} value={g.id}>
                                    {g.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Time: </label>
                    <input type="time" name="time"  required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>


            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        gameId: currentEvent.gameId,
                        organizer: currentEvent.organizer,
                        description: currentEvent.description,
                        date:currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}