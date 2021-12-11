import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Material UI components
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
// Actions
import { login, skipLogin } from '../actions/auth';
import { setAlert, removeAlert } from '../actions/alert';
// Files
import './css/auth.css';
import Spinner from './Spinner';
import logo from '../images/auctionslogo3.png';
import Alert from './Alert';
// import Register from './Register';

const Login = (props) => {
  const [formData, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    // e.preventDefault();
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login(email, password);
  };

  // If already auth, redirect to dashboard
  if (props.isAuthenticated) {
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
          <p className='auth__subtitle'>
            <i className='fas fa-user'></i> Log in to your account
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
            <Button
              variant='contained'
              type='submit'
              className='auth__button'
              color='primary'
            >
              Login
            </Button>
          </form>

          <p>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
          <div className='auth__separator' />
          <p>To use the app without login:</p>
          <Button variant='contained' className='auth__button' onClick={props.skipLogin}>
            Skip
          </Button>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  alerts: state.alert,
});

export default connect(mapStateToProps, { login, skipLogin, setAlert, removeAlert })(
  Login
);
