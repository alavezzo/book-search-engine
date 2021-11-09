const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v -password')
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)

            return user;
        }
    }
}

module.exports = resolvers;