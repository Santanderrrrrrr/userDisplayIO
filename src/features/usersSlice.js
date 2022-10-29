import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    status: 'idle',
    error: null
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //I'll be adding user reducers here
        addUser: (state, action) => state.users.push(action.payload),
        // deleteUser: state => state.value - 1,
    },
    extraReducers(builder){
        builder
        .addCase(fetchUsers.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched users to the array
            state.users = state.users.concat(action.payload)
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const selectAllUsers = state => state.users.users

export const selectUserById = (state, userId) =>
  state.users.users.find(user => user.id === userId)

export const fetchUsers = createAsyncThunk('users/fetchusers', async () => {
    let deets = [];
    let response = await fetch('https://jsonplaceholder.typicode.com/users',{
      method: 'GET'
    })
    let reponse = await response.json()
    
    for(let i=0; i<reponse.length; i++) {
      deets.push({
        id: reponse[i].id,
        name: reponse[i].name,
        username: reponse[i].username,
        email: reponse[i].email,
        city: reponse[i].address.city,
      })
    }
    return deets
  })

export const {  } = usersSlice.actions

export default usersSlice.reducer