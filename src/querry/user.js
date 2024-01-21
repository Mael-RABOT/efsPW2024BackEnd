const db = require("../config/db")

exports.getUserById = (res, userId) => {
    db.query('SELECT * FROM `user` WHERE `id` = ?',
        [userId],
        function (error, result) {
            if (error || result.length > 1)
                return res.status(500).json({ msg: "Internal server error" })
            if (result.length === 0)
                return res.status(404).json({ msg: "User doesn't exist" })
            return res.status(200).json({
                id : result[0].id,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                blood_group:  result[0].blood_group,
                current_challenge_id: result[0].current_challenge_id,
            })
        })
}

exports.getCurrentChallengeId = (userId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT current_challenge_id FROM users WHERE id = ?', [userId], (error, results, fields) => {
            if (error) {
                console.log(`Error fetching current challenge ID: ${error.stack}`);
                reject(error);
            } else {
                resolve(results.length > 0 ? results[0].current_challenge_id : null);
            }
        });
    });
};