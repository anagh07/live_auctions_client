import React, { Fragment } from 'react';
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
  TableBody,
} from '@mui/material';
// Style files
import { boxStyle, paperStyle } from './css/adStyles';
import { profileTableStyle, tableCellStyle } from './css/dashStyle';
// Project files
import Spinner from './Spinner';
import Board from './Board';

const Dashboard = (props) => {
  const navigate = useNavigate();
  // Check if user is logged
  if (!props.isAuth) {
    navigate('/login');
  }

  return props.loading ? (
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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Dashboard);
