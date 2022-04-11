// BIack1st

// File name: LatestPost.js


const fetch = require("node-fetch")


async function get(user) {
    try {
        const url = `https://devforum.roblox.com/user_actions.json?offset=0&username=${user}&filter=5`

        const request = await fetch(url)
        if (request.ok) {
            const data = await request.json()


            return data.user_actions[0] // gives the latest post
        }
        else {
            throw new Error("failed to get data")
        }
    }
    catch(err) {
        console.log(err)
        get(user)
    }    
}


module.exports = get