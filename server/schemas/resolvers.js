const { AuthenticationError } = require('apollo-server-express');
const { argsToArgsConfig } = require('graphql/type/definition');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne(context.user)
                                            .select('-__v -password')
                                            .populate('savedBooks')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                        .populate('savedBooks')
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            
            const correctPw = await user.isCorrectPassword(password);
            
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user}
        },
        addUser: async (parent, args) => {
            const user = await User.create(args)
            
            const token = signToken(user);
            return {token, user };
        },
        deleteBook: async (parent, args, context) => {
            
            if (context.user) {
                const deletedBook = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $pull: { savedBooks: {_id: args._id } }},
                    { new: true }
                    )
                return deletedBook;
            }
            throw new AuthenticationError('Not logged in')
        },
        saveBook: async (parent, args, context) => {
           
            if (context.user) {
                const savedBook = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { savedBooks: {...args } }},
                    { new: true })
          
                return savedBook;
            }

            throw new AuthenticationError('Not logged in');
        }
    }
}

module.exports = resolvers;