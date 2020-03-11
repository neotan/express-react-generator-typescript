const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase()
let userDaoPath = './User/UserDao'

userDaoPath = usingMockDb === 'true' ? userDaoPath + '.mock' : userDaoPath
export const { UserDao } = require(userDaoPath)
