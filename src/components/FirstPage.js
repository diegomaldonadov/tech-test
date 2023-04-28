import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";

function FirstPage({ data }) {
  const bids = data.map(obj => obj.bid);
  const asks = data.map(obj => obj.asks);
  
  const columns = [
    { field: 'currency', headerName: 'Currency', width: 200 },
    { field: 'bid', headerName: 'Bid', width: 330, renderCell: (data) => {
      const value = data.row.bid;
      const previousValue = data.rowIndex === undefined ? data.row.bid : bids[data.rowIndex - 1];
      const isUp = value >= previousValue;
      const color = isUp ? 'green' : 'red';
      return (
        <span style={{ color }}>
          {value.toFixed(10)}
         { console.log(bids)}

        </span>
      );
    }},
    { field: 'ask', headerName: 'Ask', width: 330, renderCell: (data) => {
      const value = data.row.ask;
      const previousValue = data.rowIndex === undefined ? data.row.ask : asks[data.rowIndex - 1];
      const isUp = value >= previousValue;
      const color = isUp ? 'green' : 'red';
      return (
        <span style={{ color }}>
          {value.toFixed(10)}
        </span>
      );
    }}
  ];

  //console.log("WebSocket message received:", data);

  return (
    <div>
      <Container fixed>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.currency}
          pageSize={10}
          pagination
          rowsPerPageOptions={[10]}
        />
      </Container>
    </div>
  );
}

export default FirstPage;
