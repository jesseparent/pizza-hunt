const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: 'You need to provide a reply body!',
      trim: true
    },
    writtenBy: {
      type: String,
      required: 'You need to provide an author!',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const CommentSchema = new Schema({
  writtenBy: {
    type: String,
    required: 'You need to provide an author!',
    trim: true
  },
  commentBody: {
    type: String,
    required: 'You need to provide a comment body!',
    trim: true
  },
  replies: [ReplySchema],
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

CommentSchema.virtual('replyCount').get(function () {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;