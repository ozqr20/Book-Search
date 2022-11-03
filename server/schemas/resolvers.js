const { AuthenticationError } = require('apollo-server-express');
const { Users, Books } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
            const userDB = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                return userDB;
            }
            throw new AuthenticationError("Not Logged in");
        }
    },

    Mutation: {

    }
};

module.exports = resolvers;