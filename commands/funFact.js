const nodeFetch = require("node-fetch")

const url = "https://useless-facts.sameerkumar.website/api"

async function funFact() {
    try {
        const jokePromise = await nodeFetch(url)

        const jokeData = await jokePromise.json()
    
        return jokeData
    }

    catch(err) {
        console.log(err)
    }
   
}

module.exports = funFact