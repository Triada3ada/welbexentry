import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postingService from './postingService'

const initialState = {
  postings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new posting
export const createPosting = createAsyncThunk(
  'postings/create',
  async (postingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postingService.createPosting(postingData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user postings
export const getPostings = createAsyncThunk(
  'postings/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postingService.getPostings(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user posting
export const deletePosting = createAsyncThunk(
  'postings/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postingService.deletePosting(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updatePosting = createAsyncThunk(
  'postings/update',
  async (idAndTextObj, thunkAPI) => {
    try {
      console.log(idAndTextObj.id);
      console.log(idAndTextObj.newText);
      const token = thunkAPI.getState().auth.user.token
      console.log(token);
      console.log('sdfsdfsd');
      return await postingService.updatePosting(idAndTextObj.id, token, idAndTextObj.newText)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const postingSlice = createSlice({
  name: 'posting',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPosting.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPosting.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.postings.push(action.payload)
      })
      .addCase(createPosting.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPostings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPostings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.postings = action.payload
      })
      .addCase(getPostings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePosting.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePosting.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.postings = state.postings.filter(
          (posting) => posting._id !== action.payload.id
        )
      })
      .addCase(deletePosting.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePosting.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePosting.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.postings = state.postings.filter(
          (posting) => posting._id !== action.payload.id
        )
      })
      .addCase(updatePosting.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = postingSlice.actions
export default postingSlice.reducer
