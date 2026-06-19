import UserService from "../services/userService.js";


export const resolvers = {
  user: ({ userId }) => {
    return UserService.getUserById(userId);
  },

  users: () => {
    return UserService.getAllUsers();
  }
};

/*
export const resolvers = {
  Query: {
    user: (_, args) => UserService.getUserById(args.userId),
    users: () => UserService.getAllUsers()
  }
};
*/