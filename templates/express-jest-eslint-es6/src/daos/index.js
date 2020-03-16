const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase()
let userDaoPath = './User/UserDao'

userDaoPath = usingMockDb === 'true' ? userDaoPath + '.mock' : userDaoPath
const UserDao = require(userDaoPath)

module.exports = {
  UserDao,
}
