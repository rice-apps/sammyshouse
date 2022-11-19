const express = require('express');
const Profile = require('../model/profile');
const Organization = require('../model/organization');
const Membership = require('../model/membership');

const router = express.Router()

module.exports = router;

const asyncFilter = async (arr, f) => {
    const results = await Promise.all(arr.map(f));
    return arr.filter((_v, index) => results[index]);
}

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
        console.log(req);
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

// have profile follow an organization
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
        organization.members.push(membership._id);
        await profile.save();
        await organization.save();
        res.status(200).send("Followed organization succesfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// have profile unfollow an organization
router.post('/:profileId/unfollow/:orgId', async (req, res) => {
    const profileId = req.params.profileId;
    const orgId = req.params.orgId;
    try {
        const profile = await Profile.findById(profileId);
        const organization = await Organization.findById(orgId);
        const keepMembership = async (member_id) => {
            const membership = await Membership.findById(member_id);
            return membership.member != profileId || membership.role != "Member" || membership.organization != orgId
        };
        profile.memberships = await asyncFilter(profile.memberships, keepMembership);
        organization.members = await asyncFilter(organization.members, keepMembership);
        await profile.save();
        await organization.save();
        await Membership.deleteMany({
            member: profileId,
            role: "Member",
            organization: orgId
        });
        res.status(200).send("Unfollowed organization successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
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
