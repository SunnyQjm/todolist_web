import React from 'react';
import Modal from 'antd/lib/modal'
import {Button, Checkbox, Form, Icon, Input} from "antd";
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class LoginRegisterModal extends React.Component {

    static MODE = {
        LOGIN: 'login',
        REGISTER: 'register',
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {onSubmit, mode, showRegister, showLogin} = this.props;
        return (
            <Modal {...this.props}>
                <Form onSubmit={e => {
                    onSubmit(e, this.props.form)
                }} className="login-form">
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名！'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码！'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    {
                        mode === LoginRegisterModal.MODE.REGISTER ?
                            <FormItem>
                                {getFieldDecorator('passwordAgain', {
                                    rules: [{required: true, message: '请再次请输入密码！'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password"
                                           placeholder="再次输入密码"/>
                                )}
                            </FormItem>
                            :
                            ""
                    }
                    <FormItem>
                        {
                            mode === LoginRegisterModal.MODE.LOGIN ?
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                                :
                                ""
                        }
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{
                            width: '100%'
                        }}>
                            {mode === LoginRegisterModal.MODE.LOGIN ? "登陆" : "注册"}
                        </Button>
                        {
                            mode === LoginRegisterModal.MODE.LOGIN ?
                                <span>Or <a onClick={showRegister}>注册</a></span>
                                :
                                <span>Or <a onClick={showLogin}>登陆</a></span>
                        }
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}


const WrappedComponent = Form.create()(LoginRegisterModal);

WrappedComponent.propTypes = {
    onSubmit: PropTypes.func,
    showRegister: PropTypes.func,
    showLogin: PropTypes.func,
};

WrappedComponent.defaultProps = {
    onSubmit: () => {

    },
    showRegister: () => {

    },
    showLogin: () => {

    }

};
export default WrappedComponent;