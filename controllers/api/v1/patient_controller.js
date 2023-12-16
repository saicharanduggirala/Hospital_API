const Patient = require('../../../models/patientModel');

module.exports.register = function (req, res) {

    Patient.findOne({ phone: req.body.phone }).then((data) => {
        if (!data) {
            // If the doctor does not exist, create a new one
            let data = Patient.create({
                name: req.body.name,
                phone: req.body.phone,
                doctor: req.doctor._id
            });

            return res.status(200).json({
                success: true,
                message: data,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: data
            })
        }


    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    })
};

