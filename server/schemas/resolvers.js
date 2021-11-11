const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne(context.user)
                                            .select('-__v -password')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
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
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const savedBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { books: { authors: [args.authors], description: args.description, bookId: args.bookId, image: args.image,link: args.link, title: args.title }} },
                    { new: true })

                return savedBook;
            }

            throw new AuthenticationError('Not logged in');
        }

    }
}

module.exports = resolvers;