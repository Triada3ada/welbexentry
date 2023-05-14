import axios from 'axios'

const API_URL = '/api/postings/'

// Create new posting
const createPosting = async (postingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, postingData, config)

  return response.data
}

// Get user postings
const getPostings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user posting
const deletePosting = async (postingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + postingId, config)

  return response.data
}

const updatePosting = async (postingId, token, updateInput) => {
  console.log(token);
  console.log('ALLOs');
  console.log(updateInput);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body:{
      input: updateInput
    }
  }

  const response = await axios.put(API_URL + postingId, config)

  return response.data
}

const postingService = {
  createPosting,
  getPostings,
  deletePosting,
  updatePosting
}

export default postingService
