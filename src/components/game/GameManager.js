
export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const getGameById = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const createGame = (game) => {
    return fetch("http://localhost:8000/games", { 
    method: "POST",    
    headers:{
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json"
            
        },
        body: JSON.stringify(game)
    })
    // don't need a .then because don't need a response
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateGame = game => {
    debugger
    return fetch(`http://localhost:8000/games/${game.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })
        .then(getGames)
}

