require('dotenv').config();
const webPush = require('web-push');
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

webPush.setVapidDetails(
    'mailto:malyendf@gmail.com',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
);

const app = express()
app.use(cors())
app.use(express.json());

let userSubscription = null;
let checkIn = null;
let checkOut = null;

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/subscribe', (req, res) => {
    userSubscription = req.body.subscription,
    checkIn = req.body.checkIn,
    checkOut = req.body.checkOut,

    console.log('Subscription saved'),
    res.status(201).json({message: 'Subscribed!' })
})

app.post('/send-notification', (req, res) => {
    const payload = JSON.stringify({
        title: req.body.title,
        body: req.body.body
    })
    webPush.sendNotification(userSubscription, payload)
    res.status(200).json({ message: 'Notification sent!' })
})

cron.schedule('* * * * *', () => {
    // For the checkIn time
    if (!userSubscription || !checkIn) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const inParts = checkIn.split(':');
    const inHour = Number(inParts[0]);
    const inMinute = Number(inParts[1]);

    if (currentHour === inHour && currentMinute === inMinute) {
        const payload = JSON.stringify({
            title: 'OneChance',
            body: 'The Time of has come, Set your tasks?'
        })
        webPush.sendNotification(userSubscription, payload)
    }

    if (!userSubscription || !checkOut) return;

    const outParts = checkOut.split(':');
    const outHour = Number(outParts[0]);
    const outMinute = Number(outParts[1]);

    if (currentHour === outHour && currentMinute === outMinute){
        const payload1 = JSON.stringify({
            title: 'OnceChance',
            body: 'Judgement day has come, what have you completed?'
        })
        webPush.sendNotification(userSubscription, payload1)
    }
})

app.listen(8080, '0.0.0.0' , () => {
    console.log('Server is running on https://onechance.onrender.com/')
})