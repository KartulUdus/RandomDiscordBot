const CHANNELID = ''            // CHANNEL ID WHERE ALERT WILL BE SENT
const DISCORD_KEY = ''          // DISCORD BOT TOKEN
const HOST = '127.0.0.1'        // HOST
const PORT = '1234'             // PORT



const app = require('express')()
const Discord = require('discord.js')
const client = new Discord.Client()
const bodyParser = require('body-parser');
const mustache = require('mustache')

app.use(bodyParser.json());


let TEMPLATE = {
        embed: {
            title: "{{name}} {{uuid}}",
            description: "{{fetch}} {{scanning}}",
        }
    }



function sendHook(data){
    let message = mustache.render(JSON.stringify(TEMPLATE), { name: data.name, uuid: data.uuid, fetch: data.fetch, scanning:data.scanning })
    message = JSON.parse(message)
    console.log(`Sending info about ${data.name} to ${CHANNELID}`)
    client.channels.get(CHANNELID).send(message)
}

app.post('/', (req, res) => {
    res.sendStatus(200)
    console.log(`received` ,req.body)
    sendHook(req.body)
})
app.listen(PORT, HOST, () => console.log(`Example app listening on port ${PORT}!`))
client.login(DISCORD_KEY).catch((err) => {console.log(err)})