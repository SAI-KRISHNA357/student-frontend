import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { EditDetails } from './EditDetails.tsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetStudentDetailsQuery } from '../../services/useGetStudentDetails.ts';
import { useDeleteStudentDetailMutation } from '../../services/useDeleteStudentDetail.ts';
import { ViewDetailsProps } from '../types/types.ts';

export const ViewDetails = ({ refetchValue, setRefetch }: ViewDetailsProps) => {
  const [data, setData] = useState<any[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<any | null>(null);
  const [searchTerm, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const { data: studentDetails, isError, isLoading, refetch } = useGetStudentDetailsQuery();
  const [deleteStudentDetails] = useDeleteStudentDetailMutation();

  useEffect(() => {
    setData(studentDetails || []);
    setFilteredData(studentDetails || []);
    if (refetchValue) {
      setRefetch(false);
      refetch();
    }
  }, [studentDetails, refetchValue]);

  useEffect(() => {
    const results = data.filter(record =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleEditClick = (details: any) => {
    setSelectedDetails(details);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedDetails(null);
  };

  const handleSave = (updatedDetails: any) => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.mobile === updatedDetails.mobile ? updatedDetails : item
      )
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudentDetails(id).unwrap();
    } catch (error) {
      console.error('Error deleting details:', error);
    }
    refetchValue ? refetch() : setRefetch(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 2, alignItems: 'center', gap: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Student Details
        </Typography>
        <TextField
          variant="standard"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter name to search"
          type="search"
        />
      </Box>
      {isError && <Typography color="error">Error fetching data</Typography>}
      {filteredData.length > 0 ? (
        <Grid container spacing={2} sx={{ maxWidth: 1000 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, borderBottom: '1px solid grey', gap: 1 }}>
              <Typography variant="h6" sx={{ flex: '1 1 150px' }}>Name</Typography>
              <Typography variant="h6" sx={{ flex: '1 1 50px', textAlign: 'center' }}>Age</Typography>
              <Typography variant="h6" sx={{ flex: '1 1 100px' }}>Class</Typography>
              <Typography variant="h6" sx={{ flex: '1 1 150px' }}>Mobile</Typography>
              <Typography variant="h6" sx={{ flex: '0 0 50px' }}>Edit</Typography>
              <Typography variant="h6" sx={{ flex: '0 0 50px' }}>Delete</Typography>
            </Box>
          </Grid >
          {filteredData.map((record, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, borderRadius: 2, border: '1px solid grey', gap: 1 }}>
                <Tooltip title={record.name}>
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flex: '1 1 150px',
                    }}
                  >
                    {record.name}
                  </Typography>
                </Tooltip>
                <Typography sx={{ flex: '1 1 50px', textAlign: 'center' }}>{record.age}</Typography>
                <Typography sx={{ flex: '1 1 100px' }}>{record.className}</Typography>
                <Typography sx={{ flex: '1 1 150px' }}>{record.mobile}</Typography>
                <IconButton sx={{ flex: '0 0 50px' }} onClick={() => handleEditClick(record)}>
                  <EditIcon />
                </IconButton>
                <IconButton sx={{ flex: '0 0 50px' }} onClick={() => handleDelete(record.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No details available</Typography>
      )}
      {selectedDetails && (
        <EditDetails
          open={editOpen}
          onClose={handleEditClose}
          details={selectedDetails}
          onSave={handleSave}
          refetch={refetch}
        />
      )}
    </Box>
  );
};