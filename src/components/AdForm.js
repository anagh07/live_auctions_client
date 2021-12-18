// max character for prod name 15 chars
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
// MUI
import {
  Box,
  Paper,
  TextField,
  Button,
  InputLabel,
  Typography,
  Input,
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
import LoadingDisplay from './LoadingDisplay';
// Actions
import { postAd } from '../actions/ad';
import { setAlert, clearAlerts } from '../actions/alert';

const AdForm = (props) => {
  const [form, setForm] = useState({
    productName: '',
    description: '',
    basePrice: 0,
    duration: 300,
    category: '',
    image: '',
  });
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose your image file...');
  const [fileValid, setFileValid] = useState(true);
  const [uploading, setUploading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      props.clearAlerts();
    };
  }, []);

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
    if (form.basePrice.toString() === '0') {
      return props.setAlert('Base price required!');
    }
    if (form.duration.toString() === '0') {
      setForm({ ...form, duration: 300 });
    }
    if (!fileValid) {
      // if selected file is not image/exceeds size limit
      props.setAlert('Image file not valid!', 'error');
    } else {
      if (file === '') {
        // submit without photo
        await props.postAd(form);
        navigate('/');
      } else {
        // with photo
        const imagePath = await uploadImage();
        console.log(imagePath);
        if (imagePath) {
          await props.postAd({ ...form, image: imagePath });
          navigate('/');
        }
      }
    }
  };

  const fileSelected = (e) => {
    let filesize = (e.target.files[0].size / (1024 * 1024)).toFixed(3);
    let fileType = e.target.files[0].type.toString().toLowerCase();
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      props.setAlert('Image must be of type JPEG or PNG');
      setFile('');
      setFileValid(false);
    } else if (filesize > 3) {
      props.setAlert('Image size must be less than 3 MB', 'error');
      setFile('');
      setFileValid(false);
    } else {
      setFileValid(true);
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/upload/image`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return res.data.imagePath;
    } catch (error) {
      console.log(error);
      setUploading(false);
      props.setAlert('File upload failed', 'error');
    }
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
            <InputLabel>Product Name*</InputLabel>
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
            <InputLabel>Base Price*</InputLabel>
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

          {/* <Box sx={formComponent}>
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
          </Box> */}
          {uploading ? (
            <LoadingDisplay />
          ) : (
            <Box sx={formComponent}>
              <InputLabel>Upload image</InputLabel>
              <Input
                name='uploaded_file'
                type='file'
                id='imageFile'
                onChange={fileSelected}
                fullWidth
              />
              {file === '' && (
                <Typography variant='caption'>JPG or PNG maximum 3 MB</Typography>
              )}
              {/* <label htmlFor='imageFile'>{fileName}</label> */}
            </Box>
          )}

          <Box sx={formSubmitButtonContainer}>
            {!uploading && (
              <Button variant='contained' onClick={(e) => handleSubmit(e)}>
                Submit
              </Button>
            )}
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

export default connect(mapStateToProps, { postAd, setAlert, clearAlerts })(AdForm);
