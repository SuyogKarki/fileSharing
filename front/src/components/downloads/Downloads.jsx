import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../../config';
import { AuthContext } from '../../context/authContext';
import Card from '../card/Card';

const Container = styled.div`
  height: 86vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
`;
const Title = styled.div`
  width: 100%;
  text-align: center;
  height: 5rem;
  h1 {
    font-size: 2rem;
    color: #fff;
  }
`;

const Recieved = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const getUploadedFiles = async () => {
    const res = await axiosInstance.get(`/files/recieved/${user._id}`);
    setData(res.data);
  };
  useEffect(() => {
    getUploadedFiles();
  }, []);

  return (
    <Container>
      <Title>
        <h1>Recieved files</h1>
      </Title>
      <Wrapper>
        {data.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </Wrapper>
    </Container>
  );
};
export default Recieved;
