import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import {
  Box,
  ButtonGroup,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
} from '@mui/material';
// Styling
import {
  paginationStyle,
  purchasedListContainerStyle,
  purchasedListTableStyle,
} from './css/dashStyle';

const DashPurchasedList = ({ ads }) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [adPerPage] = useState(5);

  const getGMTTime = (time) => {
    const dateTime = new Date(time);
    console.log(dateTime.toUTCString());
    return dateTime.toUTCString();
  };

  const handlePurchasedDetails = (adId) => {
    navigate('/ads/' + adId);
  };

  // Pagination
  let lastAdIndex = pageNumber * adPerPage;
  let firstAdIndex = lastAdIndex - adPerPage;
  let pageNumbers = [];
  const num = Math.ceil(ads.length / adPerPage);
  for (let i = 1; i <= num; i++) {
    pageNumbers.push(i);
  }
  const clickPageNumberButton = (num) => {
    setPageNumber(num);
  };

  return (
    <Box sx={purchasedListContainerStyle}>
      <Box sx={purchasedListTableStyle}>
        <Table sx={{ width: '70%', minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Product name</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Date</TableCell>
              <TableCell align='right'>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.slice(firstAdIndex, lastAdIndex).map((ad) => (
              <TableRow key={ad._id}>
                <TableCell>{ad.productName}</TableCell>
                <TableCell align='right'>${ad.currentPrice.$numberDecimal}</TableCell>
                <TableCell align='right'>{getGMTTime(ad.updatedAt)}</TableCell>
                <TableCell align='right'>
                  <Button
                    size='small'
                    variant='outlined'
                    onClick={(e) => {
                      handlePurchasedDetails(ad._id);
                    }}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      {ads.length !== 0 && (
        <Box sx={paginationStyle}>
          <ButtonGroup variant='outlined' size='small'>
            <Button
              disabled={pageNumber === 1}
              onClick={(e) => clickPageNumberButton(pageNumber - 1)}
            >
              Prev
            </Button>
            {pageNumbers.map((num) => {
              return (
                <Button
                  key={num}
                  disabled={pageNumber === num}
                  onClick={(e) => clickPageNumberButton(num)}
                >
                  {num}
                </Button>
              );
            })}
            <Button
              disabled={pageNumber === pageNumbers[pageNumbers.length - 1]}
              onClick={(e) => clickPageNumberButton(pageNumber + 1)}
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};

export default DashPurchasedList;
