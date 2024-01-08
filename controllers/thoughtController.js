const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            console.log(thoughtData)
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
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thoughtData._id } }
            );
            if (!userData) {return res.status(404).json({ message: 'Thought was created but no user was found with this ID'})};
            res.json('Thought was created');
        } catch (err) { res.status(500).json(err); }
    },
    async updateThought (req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $set: req.body },
              { runValidators: true, new: true }
            );
      
            if (!thoughtData) {return res.status(404).json({ message: 'No thought was found with this id!' });}
            res.json({ message: 'Thought was succesfully updated!'});
          } catch (err) { res.status(500).json(err); }
    },
    async deleteThought (req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thoughtData) {return res.status(404).json({ message: 'No video with this id!' });}
      
            const userData = await User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId }},
              { new: true }
            );
      
            if (!userData) {return res.status(404).json({ message: 'Thought was deleted but no user was found with this id!' });}
            res.json({ message: 'Thought successfully deleted!' });
          } catch (err) {res.status(500).json(err);}
    },
    async createReaction (req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $addToSet: { reactions: req.body } },
              { runValidators: true, new: true }
            );
      
            if (!thoughtData) {return res.status(404).json({ message: 'No thought was found with this id!' });}
            res.json(thoughtData);
          } catch (err) {res.status(500).json(err);}
    },
    async deleteReaction (req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $pull: { reactions: { reactionId: req.params.reactionId } } },
              { runValidators: true, new: true }
            );
      
            if (!thoughtData) {return res.status(404).json({ message: 'No thought with this id!' });}
            res.json({ message: 'Reaction successfully deleted!' });
          } catch (err) {res.status(500).json(err);}
    }
};