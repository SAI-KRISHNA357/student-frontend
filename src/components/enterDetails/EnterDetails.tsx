import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, TextField, Typography, Grid, Alert } from '@mui/material';
import { Stack } from '@mui/system';

import { usePostStudentDetailsMutation } from '../../services/usePostStundentDetails.ts';
import { useCommon } from '../common/useCommon.ts';
import { EnterDetailsProps } from '../types/types.ts';

export const EnterDetails = (config: EnterDetailsProps) => {
  const { name, age, className, mobile, setName, setAge, setClassName, setMobile } = useCommon();
  const { setTab, setRefetch } = config;
  const [alert, setAlert] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3);
  const [postStudentDetails] = usePostStudentDetailsMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = { name, age, className, mobile };

    try {
      await postStudentDetails(data);
    } catch (error) {
      console.error('Error:', error);
    }

    setAlert(true);
    handleReset();

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setAlert(false);
          setTab(1);
          setRefetch(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleReset = () => {
    setName('');
    setAge('');
    setClassName('');
    setMobile('');
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>
      {alert && (
        <Box>
          <Alert severity="success">Data added successfully</Alert>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Switching to view details tab in {remainingTime} seconds...
          </Typography>
        </Box>
      )}
      <Paper sx={{ px: 2, py: 1, width: 500 }}>
        <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }} gutterBottom>
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
              onChange={(e) => setAge(e.target.value)}
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
              onChange={(e) => setMobile(e.target.value)}
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
