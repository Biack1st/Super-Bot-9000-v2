const admin = require("firebase-admin")
const serviceAccount = require("./firebase-data.json")

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

const db = admin.firestore()

const stalkManager = {
    stalk: async function(senderId, targetUser) {

       

        const data = {
            userId: senderId,
            stalking: [targetUser]
        }

        console.log(data)

       const stalkingDoc = await db.collection("stalking")

       stalkingDoc.doc('stalking').update(data)

       console.log(await this.getCurrentlyStalking())
    },

    getCurrentlyStalking: async function(id) {
        const stalkingDoc = await db.collection("stalking").doc('stalking')

        console.log(await stalkingDoc.get())
        return "F"
    }
}

module.exports = stalkManager