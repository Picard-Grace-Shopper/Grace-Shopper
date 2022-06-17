import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username, isLoggedIn } = props;

  return (
    <div>
      {isLoggedIn ? <h3>Welcome, {username}</h3> : <h3>Temp Home Page</h3>}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(Home);
