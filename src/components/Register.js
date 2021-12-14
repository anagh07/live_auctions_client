import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// Material UI components
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
// Actions
import { setAlert } from '../actions/alert';
import { removeAlert } from '../actions/alert';
import { register } from '../actions/auth';
// Files
import './css/auth.css';
import Spinner from './Spinner';
import logo from '../images/auctionslogo3.png';
import Alert from './Alert';

const Register = (props) => {
  const [formData, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2, address, phone } = formData;

  const onChange = (e) => {
    // e.preventDefault();
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert('Passwords do not match', 'error');
    } else {
      props.register({ name, email, password, address, phone });
    }
  };

  // If already auth, redirect to dashboard
  if (props.isAuth) {
    return <Navigate to='/' />;
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='auth__container'>
        <div className='auth'>
          <div className='auth__image-container'>
            <img className='app__icon' src={logo} alt='navicon' />
          </div>
          <h1 className='auth__title'>Sign Up</h1>
          <p className='auth__subtitle'>
            <i className='fas fa-user'></i> Create Your Account
          </p>

          <form
            className='form'
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <div className='form-group'>
              <Alert />
            </div>
            <div className='form-group'>
              <TextField
                className='auth__text-field'
                size='small'
                variant='outlined'
                type='text'
                placeholder='Username'
                name='name'
                required
                value={name}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className='form-group'>
              <TextField
                className='auth__text-field'
                size='small'
                variant='outlined'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className='form-group'>
              <TextField
                className='auth__text-field'
                size='small'
                variant='outlined'
                type='text'
                placeholder='Address'
                name='address'
                value={address}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className='form-group'>
              <TextField
                className='auth__text-field'
                size='small'
                variant='outlined'
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className='form-group'>
              <TextField
                className='auth__text-field'
                size='small'
                variant='outlined'
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={password}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className='form-group'>
              <TextField
                className='auth__text-field'
                size='small'
                variant='outlined'
                type='password'
                placeholder='Confirm Password'
                name='password2'
                minLength='6'
                value={password2}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <Button
              variant='contained'
              type='submit'
              className='auth__button'
              value='Register'
              color='primary'
            >
              Register
            </Button>
          </form>
          <p className='my-1'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  loading: state.auth.loading,
  alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert, removeAlert, register })(Register);
