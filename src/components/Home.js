import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Styling
import './css/home.css';
// Components
import Nav from './Nav';
import Spinner from './Spinner';

const Home = (props) => {
  // Check if user is logged
  if (!props.auth.isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return props.auth.loading ? (
    <Spinner />
  ) : (
    <div className='home'>
      <div className='nav__display'>
        <Nav />
      </div>
      {/* <div className='home__display'>
        <Menu />
        <Board />
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  ticket: state.ticket,
});

export default connect(mapStateToProps)(Home);
