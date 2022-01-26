const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/'
const createGame = async ()=>{
    const game = { 
        "name": "My cool new game" 
    }

    const response = await fetch(url+'games/',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body : JSON.stringify(game)
    })
    const gameId = await response.json()
    console.log(gameId)
}

createGame()
