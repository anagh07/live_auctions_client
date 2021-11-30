import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// Material UI Componeents
import { Button, Link } from '@mui/material';
// Files
import './css/nav.css';
import logo from '../images/auctionslogo3.png';
// Actions
import { logout } from '../actions/auth';

const Nav = (props) => {
  return (
    <div className='nav'>
      <div className='nav__group1'>
        <div className='nav__image-container'>
          <a href='/'>
            <img className='nav__icon' src={logo} alt='navicon' href='/' />
          </a>
        </div>

        <div className='nav__buttons'>
          <Button>My Dashboard</Button>
          <RouterLink to='/create'>
            <Button variant='contained' color='primary'>
              Create
            </Button>
          </RouterLink>
        </div>
      </div>

      <div className='nav__group2'>
        <div className='nav__account'>
          {props.isAuth ? (
            <Link href='#' color='inherit' onClick={props.logout}>
              Logout
            </Link>
          ) : (
            <Link to='/login'>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Nav);
