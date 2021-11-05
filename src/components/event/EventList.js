import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory, useParams } from 'react-router-dom'

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New event</button>

            <article className="events">
                {
                    events.map(event => {
                        // debugger
                        return <section key={`event--${event.id}`} className="event">
                            <div className="event__title">Title: {event.game.title} </div>
                            <div className="event__players">Organizer: {event.organizer?.user?.first_name} {event.organizer?.user?.last_name} </div>
                            <div className="event__skillLevel">Description: {event.description}</div>
                            <div className="event__skillLevel">Date: {event.date}</div>
                            <div className="event__skillLevel">Time: {event.time}</div>
                        </section>
                    })
                }
            </article>
        </>
    )
}