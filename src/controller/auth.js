const Auth = require('../model/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id, username) => {
    return jwt.sign({ id, username }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_TIMEOUT
    });
};

const signUp = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({
                message: 'username or password is required'
            });
        }

        const harshPassword = await bcrypt.genSalt();
        const userPassword = await bcrypt.hash(password, harshPassword);

        const user = await Auth.create({
            username,
            password: userPassword.trim()
        });

        res.status(200).json({
            message: 'Account created with success',
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: 'An error has occur',
            err: error
        });
    }
}

const signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userBio = await Auth.findOne({ username: username });
        if (!userBio) {
            return res.status(401).json({
                success: false,
                message: 'invalid crendentials provided'
            });
        }

        const harshPassword = await bcrypt.compare(password, userBio.password);

        if (!harshPassword) {
            return res.status(401).json({
                success: false,
                message: 'invalid crendentials provided'
            });
        }

        const token = generateToken(userBio._id, userBio.username);

        res.status(200).json({
            message: 'success',
            userBio,
            token
        })
        // console.log(userBio);

    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: 'An error has occur',
            err: error
        });
    }
}

const uploadProfilePicture = async (req, res) => {
    const { id } = req.params;

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded.",
            });
        }

        const Cid = await Auth.findById(id);
        if (!Cid) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const imageUrl = req.file.path.replace('http://', 'https://');
        console.log("Uploaded image URL:", imageUrl);

        // Update image
        Cid.image = imageUrl;
        await Cid.save();

        res.status(200).json({
            success: true,
            message: "Upload successful!",
            imageUrl: Cid.image,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: error.message || "Upload failed",
        });
    }
};

const checkCurrentUser = async (req, res) => {
    try {
        const userId = await Auth.findById(req.user);
        if (!userId) {
            res.status(400).json({
                message: 'No user found'
            })
        }
        res.status(201).json({
            message: 'User found in database',
            data: userId
        })
    } catch (error) {
        res.status(401).json({
            message: 'No user found',
            error: error.message
        })
    }
}

module.exports = {
    signUp,
    signIn,
    uploadProfilePicture,
    checkCurrentUser
}