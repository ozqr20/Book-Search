const { AuthenticationError } = require('apollo-server-express');
const { Users, Books, User } = require('../models');
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
        long: async (paren, { email, password }) => {
            const user = await User.findOne({ email });
        }
    }
};

module.exports = resolvers;