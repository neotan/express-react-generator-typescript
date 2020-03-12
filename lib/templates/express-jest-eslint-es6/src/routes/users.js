const { Router } = require('express')
const { BAD_REQUEST, CREATED, OK } = require('http-status-codes')
const { UserDao } = require('../daos')
const { logger, paramMissingError } = require('../shared')

// Init shared
const router = Router()
const userDao = new UserDao()

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req, res) => {
  try {
    const users = await userDao.getAll()
    return res.status(OK).json({ users })
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req, res) => {
  try {
    const { user } = req.body
    if (!user) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      })
    }
    await userDao.add(user)
    return res.status(CREATED).end()
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req, res) => {
  try {
    const { user } = req.body
    if (!user) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      })
    }
    user.id = Number(user.id)
    await userDao.update(user)
    return res.status(OK).end()
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params
    await userDao.delete(Number(id))
    return res.status(OK).end()
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

/******************************************************************************
 *                                     Export
 ******************************************************************************/

module.exports = router
