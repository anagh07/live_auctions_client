import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// MUI
import {
  Box,
  Paper,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
} from '@mui/material';
// Style files
import { boxStyle, paperStyle } from './css/adStyles';
import { profileTableStyle, tableCellStyle } from './css/dashStyle';
// Project files
import Spinner from './Spinner';
import Board from './Board';
// Actions
import { getUserPurchasedAds } from '../actions/ad';

const Dashboard = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.getUserPurchasedAds();
  }, []);

  // Check if user is logged
  if (!props.isAuth) {
    navigate('/login');
  }

  const getGMTTime = (time) => {
    const dateTime = new Date(time);
    console.log(dateTime.toUTCString());
    return dateTime.toUTCString();
  };

  const handlePurchasedDetails = (adId) => {
    navigate('/ads/' + adId);
  };

  return props.loading || props.purchasedLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Box sx={boxStyle}>
        <Paper sx={paperStyle}>
          <Typography variant='h5'>My Profile</Typography>
          <Box sx={profileTableStyle}>
            <Table sx={{ width: '60%', minWidth: '200px' }} aria-label='simple table'>
              <TableBody>
                <TableRow key='Username'>
                  <TableCell align='right' sx={tableCellStyle}>
                    User name
                  </TableCell>
                  <TableCell align='left' sx={tableCellStyle}>
                    {props.user.username}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right' sx={tableCellStyle}>
                    Email
                  </TableCell>
                  <TableCell align='left' sx={tableCellStyle}>
                    {props.user.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right' sx={tableCellStyle}>
                    Phone
                  </TableCell>
                  <TableCell align='left' sx={tableCellStyle}>
                    {props.user.phone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right' sx={tableCellStyle}>
                    Address
                  </TableCell>
                  <TableCell align='left' sx={tableCellStyle}>
                    {props.user.address}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Box>

      <Box sx={boxStyle}>
        <Paper sx={paperStyle}>
          <Typography variant='h5'>My ads</Typography>
          <Board passedUser={props.user._id} />
        </Paper>
      </Box>

      <Box sx={boxStyle}>
        <Paper sx={paperStyle}>
          <Typography variant='h5'>My purchases</Typography>
          <Box sx={profileTableStyle}>
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
                {props.purchased.map((ad) => (
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
        </Paper>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  purchased: state.ad.purchased,
  purchasedLoading: state.ad.purchasedLoading,
});

export default connect(mapStateToProps, { getUserPurchasedAds })(Dashboard);
