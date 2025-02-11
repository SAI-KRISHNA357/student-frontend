import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import {useUpdateStudentDetailsMutation} from '../../services/useUpdateStudentDetails.ts';
import { useCommon } from '../common/useCommon.ts';
import { EditDetailsProps } from '../types/types.ts';



export const EditDetails = ({ open, onClose, details, onSave, refetch }: EditDetailsProps) => {
  const {name, age, className, mobile, setName, setAge, setClassName, setMobile} = useCommon();
  const [errorMessage, setErrorMessage] = React.useState<String>('');
  const [updateStudentDetails] = useUpdateStudentDetailsMutation();

  useEffect(() => {
    setName(details.name);
    setAge(details.age);
    setClassName(details.className);
    setMobile(details.mobile);
  },[details]);

  const handleSave = async () => {
    if (!name || !age || !className || !mobile) {
      setErrorMessage('All fields are required');
      return;
    }
    const updatedDetails = { name, age, className, mobile, id: details.id };
    try {
      await updateStudentDetails(updatedDetails)
    } catch (error) {
      setErrorMessage('Error while updating details');
      console.error('Error updating details:', error);
    }
    onSave(updatedDetails);
    refetch();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{textAlign:'center'}}>Edit Details</DialogTitle>
      {errorMessage && <Box sx={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Box>}
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column',  allignItems: 'center', gap:2 }}>
        <form>
          <TextField
            variant="outlined"
            fullWidth
            value={name}
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
            required
            sx={{marginBottom: 2}}
          />
          <TextField
            variant="outlined"
            fullWidth
            value={age}
            placeholder='Enter age'
            onChange={(e) => setAge(e.target.value)}
            required
            sx={{marginBottom: 2}}
          />
          <TextField
            label="Class"
            variant="outlined"
            fullWidth
            value={className}
            placeholder='Enter class'
            onChange={(e) => setClassName(e.target.value)}
            required
            sx={{marginBottom: 2}}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            placeholder='Enter phone number'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            sx={{marginBottom: 2}}
          />
          </form>
        </Box>
      
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};