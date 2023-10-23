import express from 'express'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js'

const router = express.Router({ mergeParams: true })

router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser)

export default router
