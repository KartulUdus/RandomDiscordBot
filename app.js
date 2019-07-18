require('dotenv').config()

const { RECEIVER_HOST,
    RECEIVER_PORT,
    FORWARD_HOST,
    FORWARD_PORT,
    DISABLE_IV,
    DISABLE_RAID,
    DISABLE_QUEST
} = process.env
 
const app = require('express')()
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(bodyParser.json());

app.post('/', (req, res) => {
    res.sendStatus(200)
    console.log(`received` ,req.body)
    let hooks = req.body

    if(DISABLE_IV) hooks = hooks.filter(o => !o.message.weight)
    if (DISABLE_RAID) hooks = hooks.filter(o => o.type.toLowercase() !== 'raid')
    if (DISABLE_QUEST) hooks = hooks.filter(o => o.type.toLowercase() !== 'quest')
    if (!hooks.length) return
    fetch(`${FORWARD_HOST}:${FORWARD_PORT}`, {
        method: 'post',
        body:    JSON.stringify(hooks),
        headers: { 'Content-Type': 'application/json' },
    })
})
app.listen(RECEIVER_PORT, RECEIVER_HOST, () => console.log(`Example app listening on port ${RECEIVER_PORT}!`))
