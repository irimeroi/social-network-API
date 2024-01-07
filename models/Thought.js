const { Schema, model } =  require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //todo:
            //Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        //Array of nested documents created with the reactionSchema
        reactions: [reactionSchema]
    }, {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//reactions field subdocument schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
        }
    }, {
        toJSON: {
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;