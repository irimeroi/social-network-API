const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const userData = await User.find();
            res.json(userData);
        } catch (err) { res.status(500).json(err) }
    },
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
            //populated thought and friend data
            if (!userData) {
                return res.status(400).json({ message: 'No user was found with that ID' })
            }
        } catch (err) { res.status(500).json(err); }
    },
    async createUser (req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) { res.status(500).json(err); }
    },
    // async updateUser (req, res) {}
    // async deleteUser (req, res) {}
};