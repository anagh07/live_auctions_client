import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Styling
import './css/home.css';
// Components
import Nav from './Nav';
import Board from './Board';
import Alert from './Alert';

const Home = (props) => {
  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='home'>
      <div className='nav__display'>
        <Nav />
      </div>
      <div className='alert__display'>
        <Alert />
      </div>
      <div className='ad__board'>
        <Board />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
