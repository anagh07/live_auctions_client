// max character for prod name 15 chars
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
// MUI
import {
  Box,
  Paper,
  FormControl,
  TextField,
  Button,
  InputLabel,
  Typography,
} from '@mui/material';
// Files
import Alert from './Alert';
import {
  boxStyle,
  adFormArea,
  formComponent,
  formTextField,
  formSubmitButtonContainer,
} from './css/adStyles';
// Actions
import { postAd } from '../actions/ad';
import { setAlert } from '../actions/alert';

const AdForm = (props) => {
  const [form, setForm] = useState({
    productName: '',
    description: '',
    basePrice: 0,
    duration: 300,
    category: '',
    image: '',
  });
  let navigate = useNavigate();

  const handleFormChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for empty fields
    if (form.productName === '') {
      return props.setAlert('Product name required!');
    }
    if (form.basePrice == 0) {
      return props.setAlert('Base price required!');
    }
    if (form.duration == 0) {
      setForm({ ...form, duration: 300 });
    }
    await props.postAd(form);
    navigate('/');
  };

  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <Fragment>
      <Box sx={boxStyle}>
        <Paper sx={adFormArea}>
          {/* Page title */}
          <Typography variant='h4'>Post Ad</Typography>
          <Alert />

          {/* Form */}
          <Box sx={formComponent}>
            <InputLabel>Product Name</InputLabel>
            <TextField
              name='productName'
              onChange={(e) => {
                handleFormChange(e);
              }}
              size='small'
              sx={formTextField}
            ></TextField>
          </Box>
          <Box sx={formComponent}>
            <InputLabel>Description</InputLabel>
            <TextField
              name='description'
              multiline
              placeholder='Product description'
              onChange={(e) => handleFormChange(e)}
              size='small'
              rows={3}
              sx={formTextField}
            />
          </Box>

          <Box sx={formComponent}>
            <InputLabel>Base Price</InputLabel>
            <TextField
              name='basePrice'
              onChange={(e) => {
                handleFormChange(e);
              }}
              size='small'
              placeholder='Auction will start from this price point.'
              sx={formTextField}
            ></TextField>
          </Box>

          <Box sx={formComponent}>
            <InputLabel>Duration</InputLabel>
            <TextField
              name='duration'
              onChange={(e) => {
                handleFormChange(e);
              }}
              size='small'
              placeholder='Duration in seconds'
              sx={formTextField}
            ></TextField>
          </Box>

          <Box sx={formComponent}>
            <InputLabel>Category</InputLabel>
            <TextField
              name='category'
              onChange={(e) => {
                handleFormChange(e);
              }}
              size='small'
              placeholder='Food, electronics, sports ...'
              sx={formTextField}
            ></TextField>
          </Box>

          <Box sx={formComponent}>
            <InputLabel>Image URL</InputLabel>
            <TextField
              name='image'
              onChange={(e) => {
                handleFormChange(e);
              }}
              size='small'
              placeholder='Direct image link (jpg/png/jpeg). Can be an imgur direct link.'
              sx={formTextField}
            ></TextField>
          </Box>

          <Box sx={formSubmitButtonContainer}>
            <Button variant='contained' onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { postAd, setAlert })(AdForm);
