const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get appointments by user ID
const getAppointmentsByUserId = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new appointment
const createAppointment = async (req, res) => {
  try {
    const { subject, details, date, userId, status = 'scheduled' } = req.body;

    // Generate appointment ID
    const appointmentId = `apt_${userId}_${Date.now()}`;

    const appointment = new Appointment({
      _id: appointmentId,
      subject,
      details,
      date: new Date(date),
      status,
      userId,
      createdAt: new Date()
    });

    const savedAppointment = await appointment.save();

    // Update user's appointments array
    const user = await User.findOne({ _id: userId });
    if (user) {
      user.appointments.push(savedAppointment.toJSON());
      user.updatedAt = new Date();
      await user.save();
    }

    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update user's appointments array
    const user = await User.findOne({ _id: appointment.userId });
    if (user) {
      const appointmentIndex = user.appointments.findIndex(apt => apt.id === appointment._id);
      if (appointmentIndex !== -1) {
        user.appointments[appointmentIndex] = appointment.toJSON();
        user.updatedAt = new Date();
        await user.save();
      }
    }

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({ _id: req.params.id });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Remove from user's appointments array
    const user = await User.findOne({ _id: appointment.userId });
    if (user) {
      user.appointments = user.appointments.filter(apt => apt.id !== appointment._id);
      user.updatedAt = new Date();
      await user.save();
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  getAppointmentsByUserId,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
