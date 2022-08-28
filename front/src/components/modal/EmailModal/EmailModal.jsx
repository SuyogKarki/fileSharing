import React, { Component } from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import { mapState, mapDispatch } from './EmailModal.map';

const EmailModalForm = Form.create({ name: 'form_in_modal' })(
  class extends Component {
    render() {
      const { visible, onCancel, onCreate, form, mode } = this.props;
      const { getFieldDecorator } = form;
      let emailField = this.props.form.getFieldValue('email');
      return (
        <Modal visible={visible} title={'Enter Email to share this file with'} okText={'Send'} onCancel={onCancel} onOk={onCreate}>
          <Form layout='vertical'>
            <Form.Item label='Email'>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input a Email Address' }],
              })(<Input.Email placeholder='Input Email' />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class PasswordModal extends Component {
  handleCreate = () => {
    const form = this.formRef.props.form;
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  onReset = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.props.onReset();
  };

  render() {
    return <EmailModalForm wrappedComponentRef={this.saveFormRef} visible={this.props.modal.show} onCancel={this.onReset} onCreate={this.handleCreate} hint={this.props.hint} mode={this.props.mode} />;
  }
}

export default connect(mapState, mapDispatch)(PasswordModal);
