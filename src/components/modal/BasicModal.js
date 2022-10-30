import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Stack, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../features/usersSlice'
import './BasicModal.css'
import WarningIcon from '@mui/icons-material/Warning';


const BasicModal = ({openIt, setOpenIt, name, userId}) => {

  const dispatch = useDispatch()

  const handleClose = () => {
    setOpenIt(false);
  }

  const handleDelete = (userId) => {
    dispatch(deleteUser({userId}))
    handleClose()
  }
  

  return (
    <Modal
      open={openIt}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <Stack className='backDrop' sx={{ backgroundColor:'#222', width:'350px', height: `290px`, ml: 'auto', mr:'auto', mt:'15%' }}>
          <Stack sx={{ 
            backgroundColor:'#ffcccc',
            width: '100%',
            display:'flex', 
            flexDirection:'row', 
            alignItems:'baseline',
            height:'22%',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',

            }}>
              <div className='message-icon'>
                <WarningIcon color='error'/>
              </div>
              <Typography variant="body1" className='writing' sx={{ml:1.5, mt:'auto', mb:'auto', color:'rgb(112, 111, 111)'}}>WARNING</Typography>
          </Stack>
          <Stack className='textBody' sx={{
            display: 'flex',
            flexDirection:'column',

            height:'82%',
            backgroundColor:'white',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}          
          >
            <Typography variant='h6' sx={{ml:1.5, mt: 2, mb:-0.25, mr:1.5}}>Delete Action Detected!</Typography>
            <Typography sx={{ml:1.5, mt: 0.25, mr:1.5}}>Are you sure you want to delete <b>{name}</b> from the registry? This action is irreversible.</Typography>
            <Typography sx={{ml:1.5, mt: 0.25, mr:1.5}}></Typography>
            <Stack sx={{maxWidth:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button
                                onClick={()=>handleDelete(userId)}
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ "&:hover": { backgroundColor: "#ff6666" }, backgroundColor: '#ff4d4d', width:'120px', mt: 3, mb: 2, mr: 3 }}
                                >
                                Delete
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                onClick={handleClose}
                                sx={{ "&:hover": { backgroundColor: "#fcfcfc" }, width:'120px', mt: 3, mb: 2 }}
                                >
                                Cancel
                            </Button>
                        </Stack>
          </Stack>
        </Stack>
         
        
      </div> 
    </Modal>
  );
}

export default BasicModal