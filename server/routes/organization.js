const express = require('express');
const Profile = require('../model/profile');
const Organization = require('../model/organization');
const Membership = require('../model/membership');

const router = express.Router();

module.exports = router;

const asyncFilter = async (arr, f) => {
    const results = await Promise.all(arr.map(f));
    return arr.filter((_v, index) => results[index]);
}

// Add a new organization
router.post('/addOrganization', async (req, res) => {
    const adminProfileId = req.body.adminProfileId;
    const data = new Organization({
        name: req.body.name,
        description: req.body.description,
        photo: req.body.photo,
        classification: req.body.classification,
        members: [],
        events: []
    });
    try {
        const adminProfile = await Profile.findById(adminProfileId);
        const membership = new Membership({
            member: adminProfile._id,
            role: "Admin",
            organization: data._id
        });
        await membership.save();
        data.members.push(membership._id);

        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all organizations
router.get('/getAllOrganizations', async (req, res) => {
    try {
        const data = await Organization.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get organization by ID
router.get('/getOrganizationById/:id', async (req, res) => {
    try{
        const data = await Organization.findById(req.params.id);
        res.json(data);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
});

// Get organizations by name
router.get('/getOrganizationsByName/:name', async (req, res) => {
    try {
        console.log(req)
        const data = await Organization.find({ name : req.params.name });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add event to organization
router.post('/:orgId/addEvent/:eventId', async (req, res) => {
    try {
        const orgId = req.params.orgId;
        const eventId = req.params.eventId;
        const organization = await Organization.findById(orgId);
        organization.events.push(eventId);
        await organization.save();
        res.status(200).send("Successfully added event");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update organization by ID
router.patch('/updateOrganization/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Organization.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// make a profile an admin of an org
router.post('/:orgId/addAdmin/:profileId', async (req, res) => {
    const profileId = req.params.profileId;
    const orgId = req.params.orgId;
    try {
        const profile = await Profile.findById(profileId);
        const organization = await Organization.findById(orgId);
        const membership = new Membership({
            member: profile._id,
            role: "Admin",
            organization: organization._id
        });
        await membership.save();
        profile.memberships.push(membership._id);
        organization.members.push(membership._id);
        await profile.save();
        await organization.save();
        res.status(200).send("Successfully made admin");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// remove a profile from being an admin of an org
router.post('/:orgId/removeAdmin/:profileId', async (req, res) => {
    const profileId = req.params.profileId;
    const orgId = req.params.orgId;
    try {
        const profile = await Profile.findById(profileId);
        const organization = await Organization.findById(orgId);
        const keepMembership = async (member_id) => {
            const membership = await Membership.findById(member_id);
            return membership.member != profileId || membership.role != "Admin" || membership.organization != orgId;
        }
        profile.memberships = await asyncFilter(profile.memberships, keepMembership);
        organization.members = await asyncFilter(organization.members, keepMembership);
        await profile.save();
        await organization.save();
        await Membership.deleteMany({
            member: profileId,
            role: "Admin",
            organization: orgId
        });
        res.status(200).send("Successfully removed admin");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete organization by ID
router.delete('/deleteOrganization/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Organization.findByIdAndDelete(id);
        
        res.send(`Organization '${data.name}' (id: ${id}) has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

