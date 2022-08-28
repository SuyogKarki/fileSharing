import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '../button/Button';
import InputField from '../input/InputField';
import { Link } from 'react-router-dom';
import { loginCall, registerCall } from '../../context/apiCalls';
import { AuthContext } from '../../context/authContext';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 30%;
  height: 75%;
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

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
      name: 'email',
      label: 'Email',
      type: 'email',
      value: email,
      setValue: setEmail,
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
    registerCall({ username, email, password }, dispatch);
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <h1>Register</h1>
        </Title>
        <InputFields>
          {inputs.map((item, index) => (
            <InputField key={index} {...item} />
          ))}
        </InputFields>
        <Link to='/login'>Login</Link>
        <ButtonCont>
          <Button text={'Submit'} event={handleSubmit} />
        </ButtonCont>
      </Wrapper>
    </Container>
  );
};
export default Register;
