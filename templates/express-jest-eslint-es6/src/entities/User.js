class User {
  constructor(nameOrUser, email) {
    if (typeof nameOrUser === 'string') {
      this.name = nameOrUser
      this.email = email || ''
    } else {
      this.name = nameOrUser.name
      this.email = nameOrUser.email
    }
  }
}

module.exports = User
