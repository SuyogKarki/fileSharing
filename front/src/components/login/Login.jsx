import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginCall } from '../../context/apiCalls';
import { AuthContext } from '../../context/authContext';
import Button from '../button/Button';
import InputField from '../input/InputField';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 30%;
  height: 60%;
  background-color: white;
  border-radius: 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const Title = styled.div`
  width: 100%;
  text-align: center;
`;
const InputFields = styled.form``;

const ButtonCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);

  const inputs = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      value: username,
      setValue: setUsername,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: password,
      setValue: setPassword,
    },
  ];

  const handleSubmit = e => {
    e.preventDefault();
    loginCall({ username, password }, dispatch);
    setUsername('');
    setPassword('');
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <h1>Login</h1>
        </Title>
        <InputFields>
          {inputs.map((item, index) => (
            <InputField key={index} {...item} />
          ))}
        </InputFields>
        <Link to='/register'>Register</Link>
        <ButtonCont>
          <Button text={'Submit'} event={handleSubmit} />
        </ButtonCont>
      </Wrapper>
    </Container>
  );
};
export default login;
