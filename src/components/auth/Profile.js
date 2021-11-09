import React, { useEffect, useState } from "react"
import { GameForm } from "../game/GameForm.js"
import { getProfile } from "./ProfileManager.js"
// import "./Profile.css"


export const Profile = () => {
    const [profile, changeProfile] = useState({})


    useEffect(() => {
        getProfile().then(data => changeProfile(data))
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: {profile.gamer?.user?.first_name} {profile?.gamer?.user?.last_name}
                </div>
                <div className="profile__username">Username: {profile?.gamer?.user?.username}</div>
                <div className="profile__bio">About you: {profile?.gamer?.bio}</div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events you are attending</h3>
                </header>
                <div className="registrations">
                    {/* TODO: Map through the events the user is attending */}

                    {
                   profile.attending?.map(p => {
                        return <section>
                            <p>{p?.game?.title}</p>
                        </section>
                    })
                    }





                </div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events you are hosting</h3>

                    {
                   profile.hosting?.map(p => {
                        return <section>
                            <p>{p?.game?.title}</p>
                        </section>
                    })
                    }


                </header>
                <div className="registrations">
                    {/* TODO: Map through the events the user is hosting */}
                </div>
            </section>
        </article>
    )
}
