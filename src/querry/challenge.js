const db = require("../config/db")

exports.getChallengeByUserId = (res, userId) => {
    db.query('SELECT current_challenge_id FROM user WHERE id = ?', [userId], (error, userChallenge, fields) => {
        if (error) {
            console.log(`Error fetching user's current challenge: ${error.stack}`)
            res.status(500).send('Internal Server Error')
        } else {
            const currentChallengeId = userChallenge.length > 0 ? userChallenge[0].current_challenge_id : null

            if (currentChallengeId) {
                db.query('SELECT * FROM challenge WHERE id = ?', [currentChallengeId], (error, currentChallenge, fields) => {
                    if (error) {
                        console.log(`Error fetching current challenge: ${error.stack}`)
                        res.status(500).send('Internal Server Error')
                    } else {
                        const nextChallengeId = currentChallengeId + 1

                        db.query('SELECT * FROM challenge WHERE id = ?', [nextChallengeId], (error, nextChallenge, fields) => {
                            if (error) {
                                console.log(`Error fetching next challenge: ${error.stack}`)
                                res.status(500).send('Internal Server Error')
                            } else {
                                const responseData = {
                                    current: currentChallenge[0],
                                    next: nextChallenge.length > 0 ? nextChallenge[0] : null,
                                }
                                res.status(200).json(responseData)
                            }
                        })
                    }
                })
            } else {
                res.status(404).send('User challenge not found')
            }
        }
    })
}
