const express = require('express')
const router = express.Router()
const {
  getPostings,
  setPosting,
  updatePosting,
  deletePosting,
} = require('../controllers/postingController')

const { protect } = require('../middleware/authMiddleware')

//check for jwt then proceed
router.route('/').get(protect, getPostings).post(protect, setPosting)
router.route('/:id').delete(protect, deletePosting).put(updatePosting)

module.exports = router
