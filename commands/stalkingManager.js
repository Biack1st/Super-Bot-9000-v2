const admin = require("firebase-admin")
const serviceAccount = require("./ServiceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const stalkManager = {
    stalk: async function(senderId, targetUser) {
        const currentlyStalking = await this.getCurrentlyStalking()

        const data = {
            userId: senderId,
            stalking: [targetUser]
        }
        const stalkingDoc = await db.collection("stalking").doc('stalking')
        stalkingDoc.set(data)
    },

    getCurrentlyStalking: async function(id) {
        const stalkingDoc = await db.collection("stalking").doc('stalking').get()

        return await stalkingDoc.data()
    }
}

module.exports = stalkManager