const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        //array of id referencing the thought model
        thoughts: [{type: Schema.Types.ObjectId, ref: 'thought'}],
        friends: [{type: Schema.Types.ObjectId, ref: 'user'}],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//virtual that retrieves the length/amount of friends per user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//initializes the user model
const User = model('user', userSchema);

module.exports = User;