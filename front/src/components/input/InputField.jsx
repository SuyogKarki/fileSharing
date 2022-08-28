import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 20px;
  }
  input {
    padding: 10px;
    margin-bottom: 15px;
    background-color: transparent;
    border: 1px solid #15d0b3;
    outline: none;
  }
`;

const InputField = ({ name, label, value, setValue, type }) => {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} onChange={e => setValue(e.target.value)} />
    </Container>
  );
};
export default InputField;
