const Profile = require('../model/userprofile');
const userId = require('../model/auth');

const userProfile = async (req, res) => {
  try {
    const { firstname, lastname, profileInfo, about, hobby, id } = req.body;

    if (!firstname || !lastname) {
      return res.status(400).json({ message: 'First name and last name are required' });
    }

    if (!Array.isArray(profileInfo) || profileInfo.length === 0) {
      return res.status(400).json({ message: 'profileInfo must be a non-empty array' });
    }

    for (const profile of profileInfo) {
      if (profile.gender !== 'male' && profile.gender !== 'female') {
        return res.status(400).json({ message: 'Gender must be either male or female' });
      }
    }

    if (!Array.isArray(about) || about.length === 0) {
      return res.status(400).json({ message: 'about must be a non-empty array' });
    }

    for (const status of about) {
      if (status.maritalStatus !== 'married' && status.maritalStatus !== 'single') {
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

    const existingUser = await userId.findOne({ _id: id });

    if (!existingUser) {
      return res.status(400).json({
        message: 'Invalid user id: user does not exist'
      });
    }

    const userData = await Profile.create({
      id,
      username: existingUser.username,
      firstname,
      lastname,
      profileInfo,
      about,
      hobby
    });

    return res.status(201).json({
      message: 'User profile created successfully',
      data: userData
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateInfo = async (req, res) => {
  const { id } = req.params;
  const { country, occupation, aboutYourself, religion, maritalStatus, one, two, three } = req.body;

  try {
    const userProfile = await Profile.findOne({ id: id });
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userProfile.profileInfo && userProfile.profileInfo.length > 0) {
      if (country) userProfile.profileInfo[0].country = country;
      if (occupation) userProfile.profileInfo[0].occupation = occupation;
    }

    if (userProfile.about) {
      if (aboutYourself) {
        userProfile.about[0].aboutYourself = aboutYourself;
      }
      if (religion) {
        userProfile.about[0].religion = religion;
      }
      if (maritalStatus) {
        userProfile.about[0].maritalStatus = maritalStatus;
      }
    }

    if (userProfile.hobby) {
      if (one) userProfile.hobby[0].one = one;
      if (two) userProfile.hobby[0].two = two;
      if (three) userProfile.hobby[0].three = three;
    }

    await userProfile.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      data: userProfile
    });
    console.log('user-profile-data', userProfile);

  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const bioProfile = await Profile.findOne({ id: id });
    // console.log(bioProfile);

    if (!bioProfile) {
      return res.status(400).json({
        message: 'No record in data base'
      });
    }

    res.json({
      message: 'success',
      success: true,
      bioProfile
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(({
      err: error
    }))
  }
}

const searchField = async (req, res) => {
  try {
    const { firstname } = req.query;
    let query = {};

    if (firstname) {
      query.firstname = { $regex: firstname.toLowerCase(), $options: 'i' };
    }

    // if (lastname) {
    //   query.lastname = { $regex: lastname, $options: 'i' };
    // }

    // if (username) {
    //   query.username = { $regex: username, $options: 'i' };
    // }

    const search = await Profile.find(query);

    res.status(200).json({
      message: 'Results found',
      search
    });
  } catch (error) {
    console.log('Error message:', error);

    res.status(400).json({
      message: 'An error occurred',
      error
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = await Profile.findOneAndDelete({ id: id });
    if (!deletedUser) {
      return res.status(400).json({
        message: 'No user found'
      })
    }
    res.status(201).json({
      status: true,
      deletedUser
    })
  } catch (error) {
    console.log('Error deleting user', error);
    res.status(400).json({
      message: 'An error occurred',
      error
    });
  }
}


module.exports = {
  userProfile,
  updateInfo,
  getUserProfile,
  searchField,
  deleteUser
};