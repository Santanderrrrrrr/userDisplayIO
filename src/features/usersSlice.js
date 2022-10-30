    import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

    const initialState = {
        users: [],
        status: 'idle',
        error: null
    }

    export const usersSlice = createSlice({
        name: 'users',
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
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = action.payload
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = action.payload
            })
        }
    })

    export const selectAllUsers = state => state.users.users

    export const selectUserById = (state, userId) => state.users.users.find(user => user.id === userId)

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
        let users = localStorage.getItem('users')
        users = JSON.parse(users)
        if(!users || users.length< deets.length){
            localStorage.setItem('users', JSON.stringify(deets))
            console.log(deets)
            return deets
        }else{
            return users
        }
  })

  export const addNewUser = createAsyncThunk('users/addNewUser', async initialUser => {
    //   let response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    //     method: 'POST',
    //     body: JSON.stringify(initialUser)
    //   })
    //   response = await response.json()

      let genId = nanoid().substring(0,4)
      let users = localStorage.getItem('users');
      users = JSON.parse(users);
      users.push({...initialUser, id:genId})
      localStorage.setItem('users', JSON.stringify(users))

      return Promise.resolve({...initialUser, id: genId})
    }
  )

  export const updateUser = createAsyncThunk('users/updateUser', async (initialUser) => {
    const { userId } = initialUser;
    
    
    try {
        // const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        //     method: 'PUT',
        //     body: initialUser
        // })
        // return response.data
        let users = localStorage.getItem('users')
        users = JSON.parse(users)
        users = users.map((user)=>{
            if(user.id ===  Number(userId)){
                return {
                    ...user, ...initialUser, id:Number(userId)
                }
            }
            return user
        })
        localStorage.setItem('users', JSON.stringify(users))
        return Promise.resolve(users)
    } catch (err) {
        
        return initialUser;
    }
  })

  export const deleteUser = createAsyncThunk('users/deleteUser', async(initialUser)=>{
    const { userId } = initialUser
    try{
        // const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        //     method: 'DELETE',
        // })
        // return response.data
        let users = localStorage.getItem('users')
        users = JSON.parse(users)
        users = users.filter((user)=>{
            return user.id !== Number(userId) && user.id !== userId
        })
        localStorage.setItem('users', JSON.stringify(users))
        return Promise.resolve(users)

    }catch(err){
        console.log(err)
    }

  })

export const {  } = usersSlice.actions

export default usersSlice.reducer