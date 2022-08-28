import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { logout } from '../../context/authActions';

const Container = styled.div`
  width: 100%;
  height: 14vh;
  /* background-color: #001529; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled.div`
  h2 {
    color: white;
  }
`;

const Profile = styled.div`
  position: relative;
  svg {
    color: white;
    font-size: 32px;
    cursor: pointer;
  }
`;
const Dropdown = styled.ul`
  position: absolute;
  list-style: none;
  top: 100%;
  left: -90px;
  background-color: white;

  width: 120px;
  padding: 0;
  li {
    width: 100%;
    text-align: center;
    color: #001529;
    padding: 10px 0;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const Links = styled.div`
  display: flex;
  list-style: none;
  width: 30%;
  justify-content: space-between;
  li {
    color: white;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: #001529;
    }
  }
`;

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Logo>
        <h2>File Sharing System</h2>
      </Logo>
      <Links>
        <li>
          <Link className='links' to='/'>
            {' '}
            Home
          </Link>
        </li>
        <li>
          <Link className='links' to='/uploads'>
            Uploads{' '}
          </Link>
        </li>
        <li>
          <Link className='links' to='/recieved'>
            {' '}
            Recieved
          </Link>
        </li>
      </Links>
      <Profile>
        <BsPersonFill onClick={() => setDisplay(prev => !prev)} />
        {display && (
          <Dropdown>
            <Link to='/profile' className='links'>
              <li>My Profile</li>
            </Link>
            <Link to='/edit-profile' className='links'>
              <li> Edit Profile</li>
            </Link>
            <li onClick={handleLogout}>Logout</li>
          </Dropdown>
        )}
      </Profile>
    </Container>
  );
};
export default Navbar;
