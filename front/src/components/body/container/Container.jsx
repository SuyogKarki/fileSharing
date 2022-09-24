import React from 'react';
import ContainerCSS from './Container.module.css';
import FileSelect from './fileselect/FileSelect';
import PasswordModal from '../../modal/PasswordModal/PasswordModal';
import StepModal from '../../modal/StepModal/StepModal';

const Container = props => {
  return (
    <div className={ContainerCSS.container}>
      <h1>Encrypt or Decrypt your files</h1>
      <h3>Encrypt and send files or decrypt recieved files.</h3>
      <PasswordModal />
      <StepModal />

      <FileSelect />
    </div>
  );
};

export default Container;
