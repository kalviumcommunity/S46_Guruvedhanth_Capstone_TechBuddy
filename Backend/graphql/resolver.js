const { PubSub }  = require('graphql-subscriptions');
const Comments = require("../models/comments");

const pubsub = new PubSub();

const COMMENT_ADDED = 'COMMENT_ADDED'; // Define the constant

const resolvers = {
  Query: {
    comments: async (_, { answerId }) => {
      return await Comments.find({ answerId }).toArray();
    },
  },
  Mutation: {
    addComment: async (_, { answerId, user, comments }) => {
      const newComment = {
        answerId,
        user,
        comments,
        id: new Date().valueOf().toString()
      };

      const savedComment = new Comments(newComment); // Save and create the comment

      await savedComment.save()
      
      // After inserting the new comment into the database, publish it
      pubsub.publish(COMMENT_ADDED, { newComment: savedComment });

      return savedComment; // Return the saved comment
    },
  },
  Subscription: {
    newComment: {
      subscribe: async (_, { answerId }) => 
        pubsub.asyncIterator([COMMENT_ADDED])
    },
  },
};

module.exports = resolvers;
