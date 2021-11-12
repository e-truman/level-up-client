import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createEvent, getEventById, updateEvent } from './EventManager.js'
import { getGames} from '../game/GameManager'


export const EventForm = () => {
    const history = useHistory()
    const { eventId } = useParams()
    const [games, setGames] = useState([])
    const [event, setEvent] = useState({})
    const editMode = eventId ? true : false  // true or false



    useEffect(() => {
        if (editMode) {
            getEventById(parseInt(eventId)).then((res) => {
                setEvent({
                    id: res.id,
                    gameId: res.game.id,
                    organizerId: res.organizer.id,
                    description: res.description,
                    date: res.date,
                    time: res.time
                })
            })
        }
        getGames().then(gameData => setGames(gameData))
    }, [])



    // const handleControlledInputChange = (event) => {
    //     const copyEvent = { ...event }
    //     copyEvent[event.target.name] = event.target.value
    //     setEvent(copyEvent)
    //   }

        const handleControlledInputChange = (evt) => {
            const newEventState = Object.assign({}, event)          // Create copy
            newEventState[evt.target.name] = evt.target.value 
            setEvent(newEventState)                                 // Set copy as new state
        }

        const constructNewEvent = () => {
                if (editMode) {
                    // PUT: 
                    updateEvent({
                        id: parseInt(event.id),
                        gameId: parseInt(event.gameId),
                        organizerId: parseInt(event.organizerId),
                        description: event.description,
                        date: event.date,
                        time: event.time
                    })
                        .then(() => history.push("/events"))
                } else {
                    // POST
                    createEvent({
                        gameId: parseInt(event.gameId),
                        organizerId: parseInt(event.organizerId),
                        description: event.description,
                        date: event.date,
                        time: event.time
                    })
                        .then(() => history.push("/events"))
                }
            }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">{editMode ? "Edit Event" : "Register New Event"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventTypeId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={event.gameId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a Game</option>
                        {
                            games?.map(g => (
                                g.id == event.gameId ? <option selected key={g.id} value={g.id}>
                                    {g.title}
                                </option> :
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
                        value={event.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Time: </label>
                    <input type="time" name="time"  required autoFocus className="form-control"
                        value={event.time}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>


            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    constructNewEvent()
                }}
                className="btn btn-primary">{editMode ? "Save Updates" : "Create"}</button>
        </form>
    )
}