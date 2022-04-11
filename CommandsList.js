const prefix = ">"

const Roulettemodule = require("./commands/roulette")

const discord = require("discord.js")

const robotIcon = "https://i.imgur.com/ufhQdix.png"

const stalkManager = require("./commands/stalkingManager")

const list = [
   
    {
        cmd: prefix + `spamping`,
        action: function(msg){
            const blacklisted = [759136939889655820]
            const repeatTime = 35

            const arg2 = msg.content.split(" ")[1]

            let replied = arg2

            for (let i = 0; i < repeatTime; i++) {
                replied += arg2
            }

            if (msg.author.id != 759136939889655820) {
              
              msg.reply(replied)
              
            }
            else {
              msg.reply("you are blacklisted from using this command")
            }
            
        },
        description: "Spam pings the following user."
    },
    {
      cmd: prefix + "funfact",
      action: async function(msg) { 
        try {
          const getFunFact = require("./commands/funFact")  

          const data = await getFunFact()

          console.log(data)

          msg.reply({embeds: [{
              color: 0x0099ff,
	            title: 'Fun fact',
              author: {
                name: 'Super Robot 9000',
                icon_url: 'https://images-ext-1.discordapp.net/external/j0GYtDP6M3F6iKBkAeLUcVPwHcmA5V-u4nmz3MNTg10/https/i.imgur.com/ufhQdix.png',
              },
              description: 'Fun fact',

              fields: [
                {
                  name: ":warning: WARNING :warning:",
                  value: "The following fact is returned by 3rd party API endpoint. The following fact may be inappropriate or gross for some users."
                },  
                {
                  name: "Fact",
                  value: data.data
                },
              
            ],
            footer: {
              text: `Called on by: ${msg.author.tag}`,
              icon_url: 'https://images-ext-1.discordapp.net/external/j0GYtDP6M3F6iKBkAeLUcVPwHcmA5V-u4nmz3MNTg10/https/i.imgur.com/ufhQdix.png',
            },
          }]
        })
        console.log("replied")
        }
        catch(err) {
          msg.reply("Failed to get a fun fact :(")
          console.log(err)          
        } 
      },
      description: "Replies with a random, useless fact." 
    },
    {
        cmd: prefix + `roulette`,
        action: function(msg, client){
          const randomchance = Roulettemodule(1,2)

          const userMsg = randomchance == 1 && "you win" || "you lose"
            
          const embedData = {
            color: 0x0099ff,
            title: 'Roulette',
            author: {
              name: 'Super bot 9000',
              icon_url: 'https://i.imgur.com/ufhQdix.png',
            },
            description: 'Roulette',
            thumbnail: {
              url: 'https://i.imgur.com/h1Al3kp.png',
            },
            fields: [
              {
                name: 'Result',
                value: userMsg,
              },
            ],
            timestamp: new Date(),
            footer: {
              text: `called on by ${msg.author.tag}`,
              icon_url: 'https://i.imgur.com/ufhQdix.png',
	        },
        }
              

          msg.reply({ embeds: [embedData] })

          
        },
        description: "Plays a game of Roulette"
    },
    {
      cmd: prefix + "help",
      action: function(msg) { 
        const feilds = []
        
        for (let i = 0; i < list.length; i++) {
            const cmd = list[i]
            feilds.push({name: cmd.cmd,
            value: cmd.description || "*no description given*"}) 
        }


        const embedData = {
            color: 0x0099ff,

            author: {
              name: "Super bot 9000",
              icon_url: "https://images-ext-1.discordapp.net/external/j0GYtDP6M3F6iKBkAeLUcVPwHcmA5V-u4nmz3MNTg10/https/i.imgur.com/ufhQdix.png"
            },
            fields: feilds
        }
        msg.reply({embeds: [embedData]})
      }
    },
    {
      cmd: prefix + "devforumstats",
      action: async function(msg) {
        const getData = require("./commands/DevforumStats")
        const getLatestPost = require("./commands/latestPost")

        const target = msg.content.split(" ")[1]

        if (target) {
       
            const data = await getData(target)

            if (! data["error_type"]) { 
              const correctUsername = data.users[0].name

              let latestPost = await getLatestPost(target)

              const latestPosturl = `https://devforum.roblox.com/t/${latestPost.topic_id}/${latestPost.post_number}`

              latestPost = latestPost.excerpt.replace(/(<([^>]+)>)/gi, "")

              let profilePic = "https://devforum.roblox.com" + data.users[0].avatar_template

              const split = profilePic.split("{size}")

              profilePic = `${split[0]}512${split[1]}`

              const userSummary =  data["user_summary"]

              const embedData = { 
                color: 0x1c55a7,
                title: `${correctUsername}'s Stats`,
                author: {
                  name: 'Super Robot 9000',
                  icon_url: robotIcon,
                },
                thumbnail: {
                  url: profilePic,
                },
                fields: [
                  {
                    name: "Days Visited: ", 
                    value: `${userSummary.days_visited} days`
                  },             
                  {
                    name: "Hearts Received",
                    value: `${userSummary.likes_received}`,
                    inline: true
                  },
                  {
                    name: "Hearts Given",
                    value: `${userSummary.likes_given}`,
                    inline: true
                  },
                  {
                    name: "Total Posts",
                    value: `${userSummary.post_count} Posts`,
                    inline: true
                  },
                  {
                    name: "Latest Post",
                    value: `${latestPost.length > 1024 && latestPost.substring(0, 1021) + "..." || latestPost}`,
                    inline: true
                  },
                  {
                    name: "Latest Post URL",
                    value: `${latestPosturl}`,
                    inline: false
                  }
                ],
                footer: {
                  text: `Called on by: ${msg.author.tag}`,
                  icon_url: robotIcon
                }
              }

              msg.reply({embeds: [embedData]})
            }
            else {
              msg.reply("Invalid user.")
            }
        }
            
        else {
          msg.reply("User is required.")
        }
      },
      description: "Gets stats of the specified devforum user."
    },
    {
        cmd: prefix + "stalk",
        action: async function(msg, client) {
            const target = msg.content.split(" ")[1]              
            
            stalkManager.stalk(msg.author.id, target)

            console.log(await stalkManager.getCurrentlyStalking(msg.author.id))
        },
        description: "stalks the specified user."
    }
]



module.exports = list