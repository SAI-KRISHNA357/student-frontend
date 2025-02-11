import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography, Grid, Alert } from '@mui/material';
import { Stack } from '@mui/system';

import { usePostStudentDetailsMutation } from '../../services/usePostStundentDetails.ts';
import { useCommon } from '../common/useCommon.ts';
import { EnterDetailsProps } from '../types/types.ts';


export const EnterDetails = (config: EnterDetailsProps) => {
  const {name, age, className, mobile, setName, setAge, setClassName, setMobile} = useCommon();
  const {setTab, setRefetch} = config;
  const [alert, setAlert] = useState(false);
  const [postStudentDetails] = usePostStudentDetailsMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = { name, age, className, mobile };

    try {
        await postStudentDetails(data).unwrap();
      }
     catch (error) {
      console.error('Error:', error);
    }
    setAlert(true);
    handleReset();
    setTimeout(() => {
      setAlert(false);
      setTab(1);
      setRefetch(true);
    }, 3000);
  };

  const handleReset = () => {
    setName('');
    setAge(undefined);
    setClassName('');
    setMobile(undefined);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // borderRadius: 1,
      // boxShadow: 3,
      gap: 1
    }}>
      {alert && <Alert severity="success">Data added successfully</Alert>}
      <Paper sx={{ px: 2, py: 1, width: 500 }}>
        <Typography variant="h5" component="h1" sx={{ textAlign:'center'}} gutterBottom>
          Enter Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextField
              label="age"
              variant="outlined"
              fullWidth
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              required
            />

            <TextField
              label="class"
              variant="outlined"
              fullWidth
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
            <TextField
              label="mobile"
              variant="outlined"
              fullWidth
              value={mobile}
              onChange={(e) => setMobile(Number(e.target.value))}
              required
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
