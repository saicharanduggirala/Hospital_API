const Doctor = require('../../../models/doctorModel');
const jwt = require('jsonwebtoken');

// doctor registration

module.exports.register = function (req, res) {
    Doctor.findOne({ email: req.body.email }).then((data) => {
        if (!data) {
            // If the doctor does not exist, create a new one
            let data = Doctor.create({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
            });

            return res.status(200).json({
                success: true,
                message: data,
            });
        }

        return res.status(200).json({
            success: true,
            message: data,
        });
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    })
};


// doctor signing-in


module.exports.login = function (req, res) {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'No email or Password',
        });
    }

    Doctor.findOne({ email: email }).then((doctor) => {
        if (doctor.password != req.body.password) {
            return res.status(4010).json({
                success: false,
                message: 'Invalid Password'
            });
        };

        const token = doctor.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token,
            message: `Log in Successfull!Keep the token safe ${doctor.username}`
        })
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    });
};