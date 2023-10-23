import User from '../models/UserModel'

dotenv.config({ path: '.env' })
connectDB()

const __dirname = path.resolve()

const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'))

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.insertMany(users)

    console.log('Data Imported!'.green.inverse)
  } catch (err) {
    console.log(`${err}`.red.inverse)
  }
  process.exit()
}

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await User.deleteMany()

    console.log('Data successfully deleted!'.green.inverse)
  } catch (err) {
    console.log(`${err}`.red.inverse)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}

console.log(process.argv)
