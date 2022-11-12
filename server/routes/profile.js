const express = require('express');
const Profile = require('../model/profile');
const Organization = require('../model/organization');
const Membership = require('../model/membership');

const router = express.Router()

module.exports = router;

// Add a new profile
router.post('/addProfile', async (req, res) => {
    const data = new Profile({
        name: req.body.name,
        email: req.body.email,
        college: req.body.college,
        year: req.body.year,
        photo: req.body.photo,
        memberships: []
    });
    
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/:profileId/follow/:orgId', async (req, res) => {
    const profileId = req.params.profileId;
    const orgId = req.params.orgId;
    try {
        const profile = await Profile.findById(profileId);
        const organization = await Organization.findById(orgId);
        const membership = new Membership({
            member: profile._id,
            role: "Member",
            organization: organization._id
        });
        await membership.save();
        profile.memberships.push(membership._id);
        organization.memberships.push(membership._id);
        await profile.save();
        await organization.save();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all profiles
router.get('/getAllProfiles', async (req, res) => {
    try {
        const data = await Profile.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get profile by ID
router.get('/getProfileById/:id', async (req, res) => {
    try{
        const data = await Profile.findById(req.params.id);
        res.json(data);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
});

// Get profiles by name
router.get('/getProfilesByName/:name', async (req, res) => {
    try {
        console.log(req)
        const data = await Profile.find({ name : req.params.name });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update profile by ID
router.patch('/updateProfile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Profile.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete profile by ID
router.delete('/deleteProfile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Profile.findByIdAndDelete(id);
        
        res.send(`Profile '${data.name}' (id: ${id}) has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
