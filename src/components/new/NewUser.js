import React, { useState } from 'react'
import { Box, Button, Grid, Stack, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'


const NewUser = () => {

    const [email, setEmail ] = useState('')

    const handleSubmit = ()=>{

    }

  return (
    <Stack className='backDrop'>
        <Stack className='activeArea'>
            <Box className='gradient' sx={{mt:2}}>
                <Typography className='instruction'>Welcome! Let's get started...</Typography>
                <Box className='theFormItself' component="form" noValidate onSubmit={handleSubmit} sx={{ mt:4 }}> 
                    <Stack sx={{
                        width: '350px', 
                        
                        borderRadius: '15px',
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-start'}}>
                            <Typography variant='h6' className='loginInstruction' sx={{ ml:'auto', mr: 'auto', mt: 3}}>Enter New User Details: </Typography>

                            <Grid className='email' sx={{
                                mt:3,
                                ml: 2,
                                width: '320px'                
                            }}>
                                <TextField
                                    name="email"
                                    required
                                    fullWidth
                                    id="outlined"
                                    label="Enter your E-Mail here..."
                                    autoFocus
                                    sx={{ backgroundColor: 'white'}}
                                    onChange={(e) => setEmail(e.target.value)} value={email}
                                    />
                            </Grid>
                            <Grid className='Password' sx={{
                                mt:3,
                                ml: 2,
                                mb: 2,
                                width: '320px'                
                            }}>
                                <FormControl sx={{  }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        required={true}
                                        type='email'
                                        value={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                        sx={{ backgroundColor: 'white', width: '320px'}}
                                        
                                        label="Email"
                                    />
                                    </FormControl>
                                    

                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ backgroundColor: 'rgb(9,29,150)', width:'320px',  ml: 2, mt: 3, mb: 2 }}
                                >
                                Create New User!
                            </Button>
                    </Stack>   
                </Box>
                
            </Box>
        </Stack>
        
    </Stack>  
    )
}

export default NewUser