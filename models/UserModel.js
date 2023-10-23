import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    username: {
      type: String,
      required: true,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      street: {
        type: String,
        required: false,
      },
      suite: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      zipcode: {
        type: String,
        required: false,
      },
      geo: {
        lat: {
          type: String,
          required: false,
        },
        lng: {
          type: String,
          required: false,
        },
      },
    },
    phone: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    company: {
      name: {
        type: String,
        required: false,
      },
      catchPhrase: {
        type: String,
        required: false,
      },
      bs: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
export default User
