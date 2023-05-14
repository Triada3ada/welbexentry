import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postingReducer from '../features/postings/postingSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    postings: postingReducer,
  },
})
