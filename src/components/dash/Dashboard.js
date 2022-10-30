import React, {useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers, fetchUsers } from '../../features/usersSlice'
import { useNavigate, Outlet } from "react-router-dom";
import './dash.css'


//imports from material ui
import { Divider, Button, Box, Typography, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import BasicModal from '../modal/BasicModal'



const Dashboard = () => {

    const [ openIt, setOpenIt ] = useState(false)

    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)
    const navigate= useNavigate()
    
  
    const userStatus = useSelector(state => state.users.status)
  
    useEffect(() => {
        if(userStatus === 'idle'){
          console.log('now fetching users')
          dispatch(fetchUsers())
        }
        if(users){
            console.log(users)
        }
      
    }, [userStatus, dispatch])
  
    const onAddUserClick=()=>{
        navigate('/new')
    }   
    const onEditUser=(userId)=>{
        navigate(`/edit/${userId}`)
    }
    const toggleDeleteModal =function(){
      setOpenIt(!openIt)
    }

  return (
    <>
      <Stack className = 'activeArea'>
        <Outlet/>
        <Box className='pageTitleBox'>
          <Typography  sx={{fontFamily:'Roboto', fontSize:'60px', fontWeight:'bold'}} className='pageTitle'>Dashboard</Typography>
        </Box>

        <TableContainer  component={Paper} 
          sx={{ maxHeight: '60vh',maxWidth: 1020, display: 'flex', flexDirection: 'column', alignItems: 'center',
              '&::-webkit-scrollbar':{
                width: 6
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1"
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ddd",
                borderRadius: 2
              } 
          }}>
          <Box className='addUserBox'>
            <Typography  sx={{fontFamily:'Roboto', fontSize:'25px', fontWeight:'500'}} className='pageTitle'>User List</Typography>
            <Button disableElevation variant='contained' onClick={onAddUserClick} sx={{mr:1}}>Add User</Button>
          </Box>
          <Divider sx={{width:'80%'}}/>
          <Table sx={{ minWidth: 650, maxHeight:'max-content',maxWidth: 'max-content' }} aria-label="simple table">
            <TableHead sx={{backgroundColor:'#fcfcfc', '&::-webkit-scrollbar': { width: '4px' }}}>
              <TableRow>
                <TableCell>UserId</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{index+1}</TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.city}</TableCell>
                  <TableCell align="right">
                    <Button onClick={()=>onEditUser(user.id)} variant='contained' disableElevation sx={{backgroundColor:'#ffbd33', "&:hover": { backgroundColor: "#ffae00" }  }}>Edit</Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={toggleDeleteModal} variant='outlined' disableElevation color='error'>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <BasicModal openIt={openIt} setOpenIt={setOpenIt} />
    </>  
    )
}

export default Dashboard