const { AuthenticationError } = require('apollo-server-express');
const { sign } = require('jsonwebtoken');
const { Users, Books, User } = require('../models');
const auth = require('../utils/auth');
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
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Inccorect Credentials');
            }

            const verifyPassword = await user.isCorrectPassword(password);
            if(!verifyPassword){
                throw new AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(user);
            return { token, user };
        },
    }
};

module.exports = resolvers;