const express = require('express');
const eventRoutes = require('./event');
const profileRoutes = require('./profile');
const orgRoutes = require('./organization');

const router = express.Router()

router.use('/events', eventRoutes);
router.use('/profiles', profileRoutes);
router.use('/orgs', orgRoutes);

module.exports = router;