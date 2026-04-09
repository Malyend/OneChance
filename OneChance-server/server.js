require('dotenv').config();
//SQLite3 database
const Database = require('better-sqlite3');
const db = new Database('onechance-db');

db.exec(`
        CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY,
        subscription Text,
        checkIn Text,
        checkOut Text)`)

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
    const sub = JSON.stringify(req.body.subscription);
    const inTime = req.body.checkIn;
    const outTime = req.body.checkOut;

    db.prepare('INSERT OR REPLACE INTO subscriptions (id, subscription, checkIn, checkOut) VALUES (1, ?, ?, ?)').run(sub, inTime, outTime)
    console.log('Subscription saved');
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
    
    const row = db.prepare('SELECT * FROM subscriptions WHERE id = 1').get();
    if (!row) return;

    const savedSubscription = JSON.parse(row.subscription);
    

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const inParts = row.checkIn.split(':');
    const inHour = Number(inParts[0]);
    const inMinute = Number(inParts[1]);


    if (currentHour === inHour && currentMinute === inMinute){
        const payload = JSON.stringify({
            title: 'OneChance',
            body: 'The Time has come, set up your tasks?',
            screen: 'check-in'
        })
        webPush.sendNotification(savedSubscription, payload)
            .catch(err => console.error("Push failed:", err));
    }

    const outParts = row.checkOut.split(':');
    const outHour = Number(outParts[0]);
    const outMinute = Number(outParts[1]);

    if (currentHour === outHour && currentMinute === outMinute){
        const payload = JSON.stringify({
            title: 'OneChance',
            body: 'The end is nigh, what tasks have you completed',
            screen: 'check-out'
        })
        webPush.sendNotification(savedSubscription, payload)
        .catch(err => console.error("Push failed:", err));
    }
})


app.listen(8080, '0.0.0.0' , () => {
    console.log('Server is running on https://onechance.onrender.com/')
})