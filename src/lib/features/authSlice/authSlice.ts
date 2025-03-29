import { createSlice } from '@reduxjs/toolkit'

interface AuthenticatedUser {
    user: object,
    isLoading: boolean
}

const initialState: AuthenticatedUser = {
    user: {},
    isLoading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoading = true,
                state.user = action.payload,
                state.isLoading = false
        },
        logout: (state) => {
            state.isLoading = true,
                state.user = {},
                state.isLoading = false
        }
    }
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer