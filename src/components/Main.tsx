import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { EnterDetails } from './enterDetails/EnterDetails.tsx';
import { ViewDetails } from './viewDetails/ViewValues.tsx';

export const Main = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [refetch, setRefetch] = useState<boolean>(false);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', px: 3, py:10 }}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Enter Details" />
        <Tab label="View Details" />
      </Tabs>
      <Box sx={{ padding: 3 }}>
        {selectedTab === 0 && <EnterDetails setTab={setSelectedTab} setRefetch={setRefetch}/>}
        {selectedTab === 1 && <ViewDetails refetchValue={refetch} setRefetch={setRefetch}/>}
      </Box>
    </Box>
  );
};