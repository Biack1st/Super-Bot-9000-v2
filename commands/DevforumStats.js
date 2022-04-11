// BIack1st

// File name: DevforumStats.js


const fetch = require("node-fetch")

async function get(user) {
    const url = `https://devforum.roblox.com/u/${user}/summary.json`

    const request = await fetch(url)

    return await request.json() 
}


module.exports = get