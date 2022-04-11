const admin = require("firebase-admin")
const serviceAccount = require("./ServiceAccountKey.json")

admin.initializeApp(serviceAccount)

const stalkManager = {
    stalk: function(senderId, targetUser) {

    }
}

module.exports = stalkManager