const express = require('express');
const User  = require('../Models/UserModel')


const ToggleToAdmin = async (req, res) => {
    try {
        // master can be toggle self to admin 
        const getuser = req.user;
        const user = await User.findById(getuser._id)
        
        if (user.role === 'master') {
            return res.status(401).json({ error: 'A user with the "master" role cannot update their role to "Admin".' });
        }

        // Continue with the update for other users
        await User.findByIdAndUpdate(
            req.params.id, 
            { role: 'Admin' }
        );

        res.status(200).json({ message: 'Admin role updated successfully' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding admin' });
    }
};


const RemoveAdmin = async (req, res) => {
    try {
       
        const user = await User.findByIdAndDelete(req.params.id, { role: 'User' });
        res.status(200).json({ message: 'Admin role removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error removing admin role' });
    }
};

const CreateSuperAdmin =  async (req, res) => {
    try {
        console.log(req.params.id)
        // get the user details form the id 
    
        // Check if a Super Admin already exists
        const existingSuperAdmin = await User.findOne({ role: 'SuperAdmin' });

        if (existingSuperAdmin) {
            return res.status(400).json({ error: 'Super Admin already exists' });
        }

        // Create a new Super Admin user
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        user.username = 'superadmin_username';
        user.role = 'SuperAdmin';
        await user.save();

        res.status(200).json({ message: 'Super Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating Super Admin' });
    }
};


module.exports ={
    RemoveAdmin,
    ToggleToAdmin,
    // CreateSuperAdmin
};
