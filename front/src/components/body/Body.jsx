import React, { useContext } from 'react';
import Container from './container/Container';
import styled from 'styled-components';
import Login from '../login/Login';
import Register from '../login/Register';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Uploads from '../uploads/Uploads';
import Recieved from '../downloads/Downloads';
import Profile from '../profile/Profile';
import Edit from '../edit/Edit';
import { AuthContext } from '../../context/authContext';
// import { useSelector } from 'react-redux';

const RootContainer = styled.div`
  background-color: #15d0b3;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const LowerContainer = styled.div`
  height: 86vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = props => {
  const { user } = useContext(AuthContext);
  return (
    <RootContainer>
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route path='/' element={user ? <Container /> : <Navigate to='/login' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/uploads' element={user ? <Uploads /> : <Navigate to='/login' />} />
          <Route path='/recieved' element={user ? <Recieved /> : <Navigate to='/login' />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
          <Route path='/edit-profile' element={user ? <Edit /> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </RootContainer>
  );
};

export default Body;
