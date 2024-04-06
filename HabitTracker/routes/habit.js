const express = require('express');

const router = express.Router();
const habitController = require('../controllers/habit_controller');

// Create new habit.
router.post('/create-habit', habitController.createHabit);
// Change status of the habit.
router.get('/toggle-status', habitController.toggleStatus);
// Delete the habit.
router.get('/delete-habit', habitController.deleteHabit);
// Updates habit.
router.post('/edit-habit', habitController.editHabit);

module.exports = router;