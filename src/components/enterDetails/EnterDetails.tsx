import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, TextField, Typography, Grid, Alert } from '@mui/material';
import { Stack } from '@mui/system';

import { usePostStudentDetailsMutation } from '../../services/usePostStundentDetails.ts';
import { useCommon } from '../common/useCommon.ts';
import { EnterDetailsProps } from '../types/types.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const EnterDetails = (config: EnterDetailsProps) => {
  const { name, age, className, mobile, setName, setAge, setClassName, setMobile } = useCommon();
  const { setTab, setRefetch } = config;
  const [postStudentDetails] = usePostStudentDetailsMutation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = { name, age, className, mobile };

    try {
      const response = await postStudentDetails(data);
      if (response?.data?.status === 201)  {
        setErrorMessage('');
        setTab(1);
        setRefetch(true);
      } else{
        const error = response?.error as FetchBaseQueryError;
        setErrorMessage((error?.data as { message: string })?.message || 'Error adding data');
      }
    } catch (error) {
      setErrorMessage(error.data?.message || 'Error adding data');
    }
    handleReset();
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
      {errorMessage && (
        <Alert severity="error">{errorMessage}</Alert>
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

<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add
                </Button>
              
                <Button
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleReset}
                >
                  Reset
                </Button>
             </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
