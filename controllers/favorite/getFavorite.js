const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const getFavorite = async (req, res) => {
    
    const { _id } = req.user;

    const user = await User.findOne({ _id });

    if (!user) {
        throw HttpError(404, 'User not found');
    };
    res.json(user.favorites);

};

module.exports = getFavorite;