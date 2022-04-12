const express = require("express")
const fetch = require("node-fetch")

require('dotenv').config()

const admin = require("firebase-admin")
const { cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")
const serviceAccount = require("./ServiceAccountKey.json")

admin.initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore();

const app = express()

const host = "http://localhost:3000"

app.get("/api/coins/get/:id", async (req, res) => {
    const userId = req.params.id

    const userCollection = await db.collection(`${userId}`)
    
    if (userCollection) {
        const coinsData = await userCollection.doc("coins").get()
        if (coinsData) {
            res.json(coinsData.data())
        }
        else {
            res.json({coins: 0})  
        }        
    }
    else {
        res.json({coins: 0})  
    }  
})

app.post("/api/coins/set/:password/:id", async (req, res) => {
    const password = req.params.password
    const userId = req.params.id
    const amount = req.query.amount
    if (password == process.env.PASSWORD) {
        const userCollection = await db.collection(`${userId}`)

        if (userCollection) {
            const coinsDoc = await userCollection.doc("coins")
            try {
                const request = await fetch(`${host}/api/coins/get/${userId}`)
                if (request.ok) {
                    const coinsData = await request.json()
                    const currentCoins = await coinsData.coins
        
                    await coinsDoc.set({
                        coins: amount && currentCoins + amount || 1 + currentCoins
                    })
                }
                else {
                    throw Error("failed to get data")
                }
            }
            catch(err) {
                await coinsDoc.set({
                    coins: amount && amount || 1
                })
            }
           
    
            res.sendStatus(200)
        }
    }
  
    else {
        res.sendStatus(400)
    }
})

app.listen(3000, () => {
    console.log("listening")
})