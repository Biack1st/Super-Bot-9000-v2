// BIack1st

// File name: coinsManager.js

const fetch = require("node-fetch")

const host = "http://localhost:3000"

require("dotenv").config()

const manager = {
    get: async function(id) {
        try { 
            const url = `${host}/api/coins/get/${id}`

            const request = await fetch(url)

            if (! request.ok) { throw Error("failed")}

            return await request.json()

        }
        catch(err) {
            return {coins: 0}
        }
    },
    set: async function(id, amount) {
        try {
            const request = fetch(`${host}/api/coins/set/${process.env.PASSWORD}/${id}?${amount}`, {method: "POST"})
            if (request.ok == false) {throw Error("failed to set")}
        }
        catch(err) {
            console.log(err)
        }
    }
}


module.exports = manager