import React, { useContext } from 'react';
import styled from 'styled-components';
import avatar from '../../assets/images/avatar.jpg';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Container = styled.div`
  width: 100%;
  height: 86vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  height: 75%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
`;
const Title = styled.div`
  width: 100%;
  height: 10%;
  text-align: center;
`;

const PP = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #15deff;
    border-radius: 50%;
  }
`;

const Fields = styled.div`
  height: 45%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonCont = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Field = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <Wrapper>
        <Title>
          <h1>Profile</h1>
        </Title>
        <PP>
          <img src={avatar} alt='' />
        </PP>
        <Fields>
          <Field>
            <h3>Username</h3>
            <h4>{user.username}</h4>
          </Field>
          <Field>
            <h3>Email</h3>
            <h4>{user.email}</h4>
          </Field>
          <Field>
            <h3>Uploaded Files</h3>
            <h4>{user.sharedFiles.length}</h4>
          </Field>
          <Field>
            <h3>Downloads Files</h3>
            <h4>{user.receivedFiles.length}</h4>
          </Field>
        </Fields>
        <ButtonCont>
          <Button text={'Edit Profile'} event={() => navigate('/edit-profile')} />
        </ButtonCont>
      </Wrapper>
    </Container>
  );
};
export default Profile;
