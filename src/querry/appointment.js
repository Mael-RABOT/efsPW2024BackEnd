const db = require("../config/db")

exports.getAppointmentById = (res, appointmentId) => {
    db.query('SELECT * FROM appointment WHERE id = ?', [appointmentId], (error, result, fields) => {
        if (error) {
            console.log(`Error fetching appointment: ${error.stack}`)
            res.status(500).send('Internal Server Error')
        } else {
            res.status(200).json(result[0])
        }
    })
}

exports.getAllAppointments = (res) => {
    db.query('SELECT * FROM appointment', (error, result, fields) => {
        if (error) {
            console.log(`Error fetching appointments: ${error.stack}`)
            res.status(500).send('Internal Server Error')
        } else {
            res.status(200).json(result)
        }
    })
}

exports.createAppointment = (res, date, donationType) => {
    db.query('INSERT INTO appointment (date, donation_type, finished) VALUES (?, ?, false)', [date, donationType], (error, result, fields) => {
        if (error) {
            console.log(`Error creating appointment: ${error.stack}`)
            res.status(500).send('Internal Server Error')
        } else {
            res.status(200).json(result[0])
        }
    })
};
