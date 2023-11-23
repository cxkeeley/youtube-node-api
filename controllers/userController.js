import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()

  res.status(200).json(users)
})

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json(user)
})

const createUser = asyncHandler(async (req, res) => {
  const { name, username, email, address, phone, website, company } = req.body

  try {
    const newUser = new User({
      name,
      username,
      email,
      address,
      phone,
      website,
      company,
    })

    await newUser.save()

    res.status(201).json(newUser)
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.email) {
      res.status(400).json({ message: 'Email is already registered' })
    } else {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { name, username, address, phone, website, company } = req.body

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          username,
          address,
          phone,
          website,
          company,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const user = await User.findByIdAndDelete(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({ message: 'User deleted successfully' })
})

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
