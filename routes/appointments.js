const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getAppointmentById,
  getAppointmentsByUserId,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');

// @route   GET /api/appointments
// @desc    Get all appointments
// @access  Public
router.get('/', getAppointments);

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID
// @access  Public
router.get('/:id', getAppointmentById);

// @route   GET /api/appointments/user/:userId
// @desc    Get appointments by user ID
// @access  Public
router.get('/user/:userId', getAppointmentsByUserId);

// @route   POST /api/appointments
// @desc    Create new appointment
// @access  Public
router.post('/', createAppointment);

// @route   PUT /api/appointments/:id
// @desc    Update appointment
// @access  Public
router.put('/:id', updateAppointment);

// @route   DELETE /api/appointments/:id
// @desc    Delete appointment
// @access  Public
router.delete('/:id', deleteAppointment);

module.exports = router;
