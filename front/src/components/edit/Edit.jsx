import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import avatar from '../../assets/images/avatar.jpg';
import Button from '../button/Button';
import InputField from '../input/InputField';
import { BiArrowBack } from 'react-icons/bi';
import { AuthContext } from '../../context/authContext';
import { updateCall, updatePassword } from '../../context/apiCalls';

const Container = styled.div`
  width: 100%;
  min-height: 86vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
`;
const Wrapper = styled.div`
  width: 25%;
  height: 80%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  position: relative;
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
  justify-content: space-evenly;
  margin: 10px 0;
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
const IconCont = styled.div`
  position: absolute;
  color: #15deff;
  font-size: 20px;
  top: 10px;
  left: 10px;
  cursor: pointer;
`;

const Edit = () => {
  const [editing, setEditing] = useState(false);
  const [part, setPart] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { dispatch, user } = useContext(AuthContext);
  const handleChangeClick = part => {
    setEditing(true);
    setPart(part);
  };
  const handleBack = () => {
    setEditing(false);
    setPart('');
  };
  const handleSubmit = () => {
    if (part === 'name') {
      updateCall({ username }, dispatch, user._id);
      setUsername('');
    } else if (part === 'email') {
      updateCall({ email }, dispatch, user._id);
    } else if (part === 'password') {
      updatePassword({ oldPassword, password }, user._id);
    }
  };
  return (
    <Container>
      <Wrapper>
        {part === '' && (
          <>
            <Title>
              <h1>Profile</h1>
            </Title>
            <PP>
              <img src={avatar} alt='' />
            </PP>
            <Fields>
              <Field>
                <h3>UserName</h3>
                <Button text={'Change name'} event={() => handleChangeClick('name')} />
              </Field>
              <Field>
                <h3>Email</h3>
                <Button text={'Change Email'} event={() => handleChangeClick('email')} />
              </Field>
              <Field>
                <h3>Password</h3>
                <Button text={'Change Password'} event={() => handleChangeClick('password')} />
              </Field>
            </Fields>
          </>
        )}
        {part === 'name' && (
          <>
            <Title>
              <h1>Profile</h1>
            </Title>
            <PP>
              <img src={avatar} alt='' />
            </PP>
            <Fields>
              <Field>
                <InputField type={'text'} value={username} setValue={setUsername} name={'username'} label={'Change Username'} />
              </Field>
            </Fields>
          </>
        )}
        {part === 'password' && (
          <>
            <Title>
              <h1>Profile</h1>
            </Title>
            <PP>
              <img src={avatar} alt='' />
            </PP>
            <Fields>
              <Field>
                <InputField type={'password'} value={oldPassword} setValue={setOldPassword} name={'oldPassword'} label={'Old Password'} />
              </Field>
              <Field>
                <InputField type={'password'} value={password} setValue={setPassword} name={'password'} label={'New Password'} />
              </Field>
              <Field>
                <InputField type={'password'} value={confirmPassword} setValue={setConfirmPassword} name={'confirm password'} label={'Confirm Password'} />
              </Field>
            </Fields>
          </>
        )}
        {part === 'email' && (
          <>
            <Title>
              <h1>Profile</h1>
            </Title>
            <PP>
              <img src={avatar} alt='' />
            </PP>
            <Fields>
              <Field>
                <InputField type={'email'} value={email} setValue={setEmail} name={'email'} label={'Change Email'} />
              </Field>
            </Fields>
          </>
        )}
        {editing && (
          <ButtonCont>
            <Button text={'Submit'} event={handleSubmit} />
          </ButtonCont>
        )}
        {editing && (
          <IconCont>
            <BiArrowBack onClick={handleBack} />
          </IconCont>
        )}
      </Wrapper>
    </Container>
  );
};
export default Edit;
