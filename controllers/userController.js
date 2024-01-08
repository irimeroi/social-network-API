const { User, Thought} = require('../models');

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
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
            if (!userData) { return res.status(400).json({ message: 'No user was found with that ID' }) };
            res.json(userData);
        } catch (err) { res.status(500).json(err); }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) { res.status(500).json(err); }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!userData) { return res.status(404).json({ message: 'No user found with this id!' }); }
            res.json(userData)
        } catch (err) { res.status(500).json(err); }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId });

            if (!userData) { return res.status(404).json({ message: 'No user found with this id!' }); }
            // BONUS: Remove a user's associated thoughts when deleted.
            // Thought.deleteMany({ _id: { $in: User.thoughts }});
            res.json({ message: 'User successfully deleted!' });
        } catch (err) { res.status(500).json(err); }
    },
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId} },
                { runValidators: true, new: true }
            );
            if (!userData) { return res.status(404).json({ message: 'No user found with this id!' }); }
            res.json(userData)
        } catch (err) { res.status(500).json(err); }
    },
    async deleteFriend (req, res) {
        try {
            const userData = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: req.params.friendId }},
              { runValidators: true, new: true }
            )
      
            if (!userData) {return res.status(404).json({ message: 'No video with this id!' });}
            res.json({ message: 'Friend was deleted!' });
          } catch (err) {res.status(500).json(err);}
    }
};