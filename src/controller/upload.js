// const Auth = require('../model/auth');

// const uploadProfilePicture = async (req, res) => {
//     let {image} = req.body;
//     try {
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No file uploaded.",
//             });
//         }

//         let userImage = await Auth.findOne({image});

//         const imageUrl = req.file.path.replace('http://', 'https://');
//         console.log("Uploaded image URL:", imageUrl);
//         userImage = imageUrl;

//         res.status(200).json({
//             success: true,
//             message: "Upload successful!",
//             imageUrl,
//         });
//     } catch (error) {
//         console.error('Upload error:', error);
//         res.status(500).json({
//             success: false,
//             error: error.message || "Upload failed",
//         });
//     }
// };

// module.exports = {
//     uploadProfilePicture
// };