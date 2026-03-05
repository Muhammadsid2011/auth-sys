import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // "user" will hold the object returned from the backend,
  // e.g. { username, email, isVerified }
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // replace entire user object
    setUser: (state, action) => {
      state.user = action.payload
    },
    // mutate pieces of the existing user object (used when checking session)
    updateUser: (state, action) => {
      state.user = {
        ...(state.user || {}),
        ...action.payload
      }
    },
    clearUser: (state) => {
      state.user = null
    },
    setVerified: (state, action) => {
      if (state.user) {
        state.user.isVerified = action.payload
      }
    }
  }
})

export const { setUser, updateUser, clearUser, setVerified } = userSlice.actions
export default userSlice.reducer;