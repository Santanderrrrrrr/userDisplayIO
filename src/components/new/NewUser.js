import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewUser } from '../../features/usersSlice'


import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'


const NewUser = () => {

    const [email, setEmail ] = useState('')
    const [name, setName ] = useState('')
    const [username, setUsername ] = useState('')
    const [city, setCity ] = useState('')

    //verification state
    const [nameProvided, setNameProvided ] =  useState(true)
    const [emailProvided, setEmailProvided ] =  useState(true)

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!email && !name){
            setEmailProvided(false)
            setNameProvided(false)
            return 
        }
        if(!email) return setEmailProvided(false)
        if(!name) return setNameProvided(false)

        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(mailFormat)){
            alert("Please enter a valid email address")
            return setEmailProvided(false)
        }
        try{
            dispatch(addNewUser({
                name,
                username,
                email, 
                city                
            })).unwrap()
        }catch(e){
            console.log(e)
        }
        setEmail('')
        setName('')
        setUsername('')
        setCity('')
        setEmailProvided(true)
        setNameProvided(true)
        Navigate('/')

    }
    const backNavigate =()=>{
        Navigate('/')
    }

  return (
    <Stack className='backDrop'>
        <Stack className='activeArea'>
            <Box className='gradient' sx={{mt:2}}>
                <Typography  sx={{fontFamily:'Roboto', fontSize:'35px', fontWeight:'bold'}} className='pageTitle'>Who's new?</Typography>
                <Box className='theFormItself' component="form" noValidate onSubmit={handleSubmit} sx={{ mt:4 }}> 
                <Typography variant='h6' className='formInstruction' sx={{mt: 3}}>Enter New User Details Below: </Typography>
                {(!emailProvided || !nameProvided) && (<Typography variant='subtitle1' className='errorInstruction' sx={{mt: 3, color: 'red'}}>The red fields below must be filled: </Typography>)}
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
                                    sx={{ backgroundColor: nameProvided? 'white': '#fce3e3'}}
                                    onChange={(e) => setName(e.target.value)} value={name}
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
                                    onChange={(e) => setUsername(e.target.value)} value={username}
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
                                    sx={{ backgroundColor: emailProvided? 'white': '#fce3e3'}}
                                    onChange={(e) => setEmail(e.target.value)} value={email}
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
                                    onChange={(e) => setCity(e.target.value)} value={city}
                                    />
                            </Grid>
                    </Stack>  
                    <Stack sx={{maxWidth:'700px', display: 'flex', flexDirection: 'row'}}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: 'rgb(9,29,150)', maxWidth:'320px', mt: 3, mb: 2, mr: 3 }}
                                >
                                Create New User!
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                onClick={backNavigate}
                                sx={{ "&:hover": { backgroundColor: "#fcfcfc" }, width:'160px', mt: 3, mb: 2 }}
                                >
                                Back!
                            </Button>
                    </Stack> 
                </Box>
                
            </Box>
        </Stack>
        
    </Stack>  
    )
}

export default NewUser