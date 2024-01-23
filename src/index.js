const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT

const userId = 1 // Demo User

const {
    getUserById,
} = require("./querry/user")

const {
    getChallengeByUserId,
} = require("./querry/challenge");

const {
    getAppointmentById,
    getAllAppointments,
    createAppointment,
} = require("./querry/appointment");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.send()
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    next()
})

/* ROUTES */

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/user', (req, res) => {
    const userId = 1 //Demo User

    getUserById(res, userId)
})

app.get('/challenges', (req, res) => {
    const userId = 1 // Demo User

    getChallengeByUserId(res, userId)
})

app.get('/appointment/:id', (req, res) => {
    const appointmentId = req.params.id

    getAppointmentById(res, appointmentId)
})

app.get('/appointments', (req, res) => {
    getAllAppointments(res)
})

app.post('/appointment', (req, res) => {
    const appointment = req.body

    console.log("Received appointment request:", appointment);

    const date = appointment.date
    const donation_type = appointment.donation_type

    if (!date || !donation_type) {
        console.log("Bad request - Missing date or donation_type");
        return res.status(400).send('Bad Request')
    }

    createAppointment(res, date, donation_type)
})

app.use("*", (req, res) => {
    res.status(404).json({ msg: 'Not Found' })
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
