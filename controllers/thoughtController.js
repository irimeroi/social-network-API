const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.json(thoughtData);
        } catch (err) { res.status(500).json(err); }
    },
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thoughtData) { return res.status(404).json({ message: 'No thought found with this ID' }) };
            res.json(thoughtData);
        } catch (err) { res.status(500).json(err); }
    },
    async createThought(req, res) {
        try {
            
        } catch (err) { res.status(500).json(err); }
    },
};