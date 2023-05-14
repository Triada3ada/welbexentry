const asyncHandler = require('express-async-handler')

const Posting = require('../models/postingModel')
const User = require('../models/userModel')

// @desc    Get postings
// @route   GET /api/postings
// @access  Private
const getPostings = asyncHandler(async (req, res) => {
  const postings = await Posting.find({ user: req.user.id })

  res.status(200).json(postings)
})

// @desc    Set posting
// @route   POST /api/postings
// @access  Private
const setPosting = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const posting = await Posting.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(posting)
})

// @desc    Update posting
// @route   PUT /api/postings/:id
// @access  Private
const updatePosting = asyncHandler(async (req, res) => {
  console.log('FINALLY TRYING TO ASK DB');
  const posting = await Posting.findById(req.params.id)

  if (!posting) {
    res.status(400)
    throw new Error('Posting not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the posting user
  if (posting.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedPosting = await Posting.findByIdAndUpdate(req.params.id, req.body.input, {
    new: true,
  })

  res.status(200).json(updatedPosting)
})

// @desc    Delete posting
// @route   DELETE /api/postings/:id
// @access  Private
const deletePosting = asyncHandler(async (req, res) => {
  const posting = await Posting.findById(req.params.id)

  if (!posting) {
    res.status(400)
    throw new Error('Posting not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the posting user
  if (posting.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await posting.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPostings,
  setPosting,
  updatePosting,
  deletePosting,
}
