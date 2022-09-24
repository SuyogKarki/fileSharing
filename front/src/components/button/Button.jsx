import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  border: none;
  outline: none;
  background-color: #15deff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = ({ text, event }) => {
  return <Btn onClick={event}>{text}</Btn>;
};
export default Button;
