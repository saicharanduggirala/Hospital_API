const Doctor = require('../../../models/doctorModel');
const Patient = require('../../../models/patientModel');
const Report = require('../../../models/reportModel');


module.exports.create_report = function (req, res) {
    Report.create({
        doctor: req.doctor._id,
        patient: req.params.id,
        status: req.body.status
    }).then(() => {
        return res.status(200).json({
            success: true,
        });
    }).catch((err) => {
        return res.status(401).json({
            success: false,
            message: err.message,
        });
    });
};


module.exports.report_by_status = function (req, res) {
    Report.find({ status: req.params.status }).then((report) => {
        return res.status(200).json({
            success: true,
            reports: report,
            message: 'Reports Fetched Successfully',
        });
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: 'Error fetching reports',
            error: err.message
        });
    });
}

module.exports.all_reports = function (req, res) {
    Report.find({ patient: req.params.id }).then((report) => {
        return res.status(200).json({
            success: true,
            reports: report,
            message: 'Reports Fetched Successfully',
        });
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: 'Error fetching reports',
            error: err.message
        });
    });
};