import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface LoginState {
    value: boolean;
    jwt: string | null;
}

const initialState: LoginState = {
    value: !!localStorage.getItem('token'),
    jwt: localStorage.getItem('token')
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setLogin: (state, action: PayloadAction<string | null>) => {
            if (action.payload === null) {
                state.value = false;
                localStorage.removeItem('token');
            } else {
                state.value = true;
                state.jwt = action.payload;
                console.log(state.value);
                localStorage.setItem('token', `${action.payload}`)
            }
        },
    },
})

export const {setLogin} = loginSlice.actions

export default loginSlice.reducer