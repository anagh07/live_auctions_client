import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Dashboard = (props) => {
  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to='/login' />;
  }

  return <div></div>;
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Dashboard);
