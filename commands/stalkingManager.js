const fetch = require("node-fetch")

const host = "http://localhost:3000"

const stalkManager = {
   stalk: async function(id, target) {
        fetch(`${host}/stalking/get/:password/:id`)
   }
} 

module.exports = stalkManager