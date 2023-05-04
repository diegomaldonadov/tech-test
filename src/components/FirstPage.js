import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";

function FirstPage({ data }) {
  const prevBidRef = useRef({});
  const prevAskRef = useRef({});
  const [compareValues, setCompareValues] = useState({});

  useEffect(() => {
    const newCompareValues = {};
    data.forEach((item) => {
      const latestBid = item.bid;
      const latestAsk = item.ask;
      const prevBid = prevBidRef.current[item.currency];
      const prevAsk = prevAskRef.current[item.currency];
      if (prevBid !== undefined && latestBid >= prevBid) {
        newCompareValues[item.currency] = {
          ...newCompareValues[item.currency],
          bid: 'green',
        };
      } else {
        newCompareValues[item.currency] = {
          ...newCompareValues[item.currency],
          bid: 'red',
        };
      }
      if (prevAsk !== undefined && latestAsk >= prevAsk) {
        newCompareValues[item.currency] = {
          ...newCompareValues[item.currency],
          ask: 'green',
        };
      } else {
        newCompareValues[item.currency] = {
          ...newCompareValues[item.currency],
          ask: 'red',
        };
      }
      prevBidRef.current[item.currency] = latestBid;
      prevAskRef.current[item.currency] = latestAsk;
    });
    setCompareValues(newCompareValues);
  }, [data, prevBidRef, prevAskRef]);

  const columns = [
    {
      field: 'currency',
      headerName: 'Currency',
      width: 200,
    },
    {
      field: 'bid',
      headerName: 'Bid',
      width: 330,
      renderCell: (data) => {
        const currency = data.row.currency;
        const value = data.row.bid;
        const color = compareValues[currency]?.bid ?? 'red';
        return (
          <span style={{ color }}>
            {value ? value.toFixed(5) : '-'}
          </span>
        );
      },
    },
    {
      field: 'ask',
      headerName: 'Ask',
      width: 330,
      renderCell: (data) => {
        const currency = data.row.currency;
        const value = data.row.ask;
        const color = compareValues[currency]?.ask ?? 'red';
        return (
          <span style={{ color }}>
            {value ? value.toFixed(5) : '-'}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <Container maxWidth="lg">
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
