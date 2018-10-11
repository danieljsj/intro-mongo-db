const User = require('./user')

const getUserById = (id) => {
  return await User.findById(id)
}

const getAllUsers = () => {
  return await User.find({})
}

const createUser = (userDetails) => {
  
}
const removeUserById = (id) => {
  
}

const updateUserById = (id, update) => {

}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
}
