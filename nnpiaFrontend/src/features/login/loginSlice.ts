import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LoginState {
    value: boolean
}

const initialState: LoginState = {
    value: !!(localStorage.getItem('login')),
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setLogin: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
            localStorage.setItem('login', `${action.payload}`)
        },
    },
})

export const { setLogin } = loginSlice.actions

export default loginSlice.reducer