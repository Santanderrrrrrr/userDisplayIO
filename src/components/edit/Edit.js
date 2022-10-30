import React, { useState } from 'react'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectUserById, updateUser } from '../../features/usersSlice'


const Edit = () => {

    let { userId } = useParams()
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    

    let thisUser = useSelector(state => selectUserById(state, userId))

    const [email, setEmail ] = useState('')
    const [name, setName ] = useState('')
    const [username, setUsername ] = useState('')
    const [city, setCity ] = useState('')

    

    const salvageable = [email, name, username, city].some(Boolean)
    const handleSaveChanges = (e)=>{
        e.preventDefault()
        if(salvageable){
            try{
                let changes = {email, name, username, city}
                for(let [key, value] of Object.entries(changes)){
                    if(!Boolean(value)){
                        delete changes[key]
                    }
                }
                
                dispatch(updateUser({userId, ...changes}))
                setEmail('')
                setName('')
                setUsername('')
                setCity('')
                Navigate('/')                
            }catch(e){
                console.log(e)
            }
        }else{
            alert("No changes Registered. Hit cancel if you don't want to make changes")
        }

    }
    const backNavigate =()=>{
        Navigate('/')
    }

  return (
    <Stack className='backDrop'>
        <Stack className='activeArea'>
            <Box className='gradient' sx={{mt:2}}>
                <Typography  sx={{fontFamily:'Roboto', fontSize:'35px', fontWeight:'bold'}} className='pageTitle'>What went wrong?</Typography>
                {thisUser && <Box className='theFormItself' component="form" noValidate onSubmit={handleSaveChanges} sx={{ mt:4 }}> 
                <Typography variant='h6' className='formInstruction' sx={{mt: 3}}>Suitably edit the required fields: </Typography>
                    <Stack sx={{
                        width: '700px',
                        borderRadius: '15px',
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'flex-start'}}>

                            <Grid className='name' sx={{
                                mt:3,
                                width: '320px'                
                            }}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="outlined"
                                    label="Enter the name here..."
                                    autoFocus
                                    sx={{backgroundColor:'white'}}
                                    onChange={(newValue) => setName(newValue.target.value)} defaultValue={thisUser.name}
                                    />
                            </Grid>
                            <Grid className='username' sx={{
                                mt:3,
                                ml:2,
                                width: '320px'                
                            }}>
                                <TextField
                                    name="username"
                                    
                                    fullWidth
                                    id="outlined"
                                    label="username"
                                    autoFocus
                                    sx={{ backgroundColor: 'white'}}
                                    onChange={(newValue) => setUsername(newValue.target.value)} defaultValue={thisUser.username}
                                    />
                            </Grid>
                        </Stack>
                        <Stack sx={{
                            width: '700px',
                            borderRadius: '15px',
                            display: 'flex', 
                            flexDirection: 'row', 
                            alignItems: 'flex-start'}}>
                            <Grid className='Email' sx={{
                                mt:3,
                                mb: 2,
                                width: '320px'                
                            }}>
                                <TextField
                                    name="email"
                                    required
                                    fullWidth
                                    id="outlined"
                                    label="email"
                                    autoFocus
                                    sx={{ backgroundColor:'white'}}
                                    onChange={(newValue) => setEmail(newValue.target.value)} defaultValue={thisUser.email}
                                    />
                                    

                            </Grid>
                            <Grid className='City' sx={{
                                mt:3,
                                ml: 2,
                                mb: 2,
                                width: '320px'                
                            }}>
                                <TextField
                                    name="city"
                                    fullWidth
                                    id="outlined"
                                    label="city"
                                    autoFocus
                                    sx={{ backgroundColor:'white'}}
                                    
                                    onChange={(newValue) => setCity(newValue.target.value)} defaultValue={thisUser.city}
                                    />
                                    

                            </Grid>

                        </Stack>  
                        <Stack sx={{maxWidth:'700px', display: 'flex', flexDirection: 'row'}}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: 'rgb(9,29,150)', maxWidth:'320px', mt: 3, mb: 2, mr: 3 }}
                                >
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                onClick={backNavigate}
                                sx={{ "&:hover": { backgroundColor: "#fcfcfc" }, width:'160px', mt: 3, mb: 2 }}
                                >
                                Cancel
                            </Button>
                        </Stack>
                </Box>}
                
            </Box>
        </Stack>
        
    </Stack>  
    )
}

export default Edit