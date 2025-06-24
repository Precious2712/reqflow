const SendReq = require('../model/sender');
const userId = require('../model/auth');

const sendRequest = async (req, res) => {
    try {
        const { userFirstName, userLastName, profile, about, hobbies, reciever, approval } = req.body;

        if (!userFirstName || !userLastName) {
            return res.status(400).json({ message: 'First name and last name are required' });
        }

        if (!Array.isArray(profile) || profile.length === 0) {
            return res.status(400).json({ message: 'profileInfo must be a non-empty array' });
        }

        for (const profiles of profile) {
            if (profiles.gender !== 'male' && profiles.gender !== 'female') {
                return res.status(400).json({ message: 'Gender must be either male or female' });
            }
        }

        if (!Array.isArray(about) || about.length === 0) {
            return res.status(400).json({ message: 'about must be a non-empty array' });
        }

        for (const position of about) {
            if (position.status !== 'married' && position.status !== 'single') {
                return res.status(400).json({ message: 'Marital status must be married or single' });
            }
        }

        for (const faith of about) {
            if (faith.religion !== 'christain' && faith.religion !== 'muslim' && faith.religion !== 'traditionalist') {
                return res.status(400).json({
                    message: 'Religion must be christain or "muslim or traditionalist'
                })
            }
        }

        const existingUser = await userId.findOne({ _id: reciever });

        if (!existingUser) {
            return res.status(400).json({
                message: 'Invalid user id: user does not exist'
            });
        }

        const userData = await SendReq.create({
            reciever,
            nickName: existingUser.username,
            userFirstName,
            userLastName,
            profile,
            about,
            hobbies,
            approval
        });

        return res.status(201).json({
            message: 'request send successfully',
            data: userData
        });
    } catch (error) {
        console.error('Error creating user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const seeSendRequet = async (req, res) => {
    const { id } = req.params; 

    try {
        const client = await SendReq.find({ reciever: id }); 

        if (!client) {
            return res.status(404).json({
                message: 'Request not found for this reciever',
            });
        }

        res.status(200).json({
            message: 'success',
            client
        });

        console.log('client', client);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};



module.exports = {
    sendRequest,
    seeSendRequet
}