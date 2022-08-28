import React from 'react';
import styled from 'styled-components';
import crypted from '../../assets/images/encrypted.png';
import { FaDownload } from 'react-icons/fa';
import { ref } from 'firebase/storage';
import { storage } from '../../config';

const Container = styled.div`
  width: 150px;
  height: 150px;
  img {
    width: 100px;
    height: 100px;
  }
`;
const Lower = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  h4 {
    font-size: 1rem;
    color: #fff;
  }
  svg {
    font-size: 1.5rem;
    color: #fff;
    cursor: pointer;
  }
`;

const Card = ({ title, fileUrl }) => {
  return (
    <Container>
      <img src={crypted} alt={'encrypted file'} />
      <Lower>
        <h4>{title.length > 15 ? title.slice(0, 15) : title}</h4>
        <a href={fileUrl} target='_blank' rel='noopener noreferrer'>
          {' '}
          <FaDownload />
        </a>
      </Lower>
    </Container>
  );
};
export default Card;
