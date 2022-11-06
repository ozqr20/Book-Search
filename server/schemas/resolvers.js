const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
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

        addUser: async (parent, args ) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { input }, context) => {
            if(context.user){
                const updtUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { saveBooks: input}},
                    { new: true }
                );
                return updtUser;
            }
            throw new AuthenticationError('You should log in')
        },

        removeBook: async (parent, args, context) => {
            if(context.user){
                const updtUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $pull: { savedBooks: {bookId: args.bookId}}},
                    { new: true }
                );
                return updtUser;
            }
            throw new AuthenticationError('You should log in')
        }
    }
};

module.exports = resolvers;