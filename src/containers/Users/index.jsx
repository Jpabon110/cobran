/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Row } from 'reactstrap';
import UserList from './components/userList';

const Users = props => (
  <Container className="dashboard">
    <Row>
      <UserList history={props.history} location={props.location} />
    </Row>
  </Container>
);

export default Users;
