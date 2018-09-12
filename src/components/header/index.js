import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LocalRouter from '../../LocalRouter'
import {
    Modal,
    Button,
    Form,
    Icon,
    Input,
    Checkbox
} from 'antd';
import {
    BaseColor
} from '../base/base-component';
import {
    SearchComponent
} from '../index'


const Logo = styled.div`
    height: 63px;
    padding: 0;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center; 
    flex-grow: 0;
`;

const Header = styled.div`
    padding: 0 34px;
    flex-grow: 0;
    display: flex;
    height: 72px;
    align-items: center;
    background-color: ${BaseColor.lightGray};
`;

const WebTitle = styled.div`
    font-size: 1.6em;
    margin-left: 20px;
    font-weight: bold;
    text-align: center;
    padding: 0;
    flex-grow: 0;
`;

const FlexDiv = styled.div`
    flex-grow: 1;
`;

const FormItem = Form.Item;

class Nav extends React.Component {

    static MODE = {
        LOGIN: 'login',
        REGISTER: 'register',
    };

    state = {
        modalVisible: false,
    };

    constructor(props) {
        super(props);
        this.showRegister = this.showRegister.bind(this);
        this.showLoginModal = this.showLoginModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showLoginModal() {
        this.setState({
            modalVisible: true,
            mode: Nav.MODE.LOGIN
        })
    }

    showRegister() {
        this.setState({
            modalVisible: true,
            mode: Nav.MODE.REGISTER
        })
    }

    hideModal() {
        this.setState({
            modalVisible: false
        })
    }

    /**
     * 处理表单提交
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {isMobile} = this.props;
        const {mode} = this.state;
        const {getFieldDecorator} = this.props.form;
        let searchComponent = <SearchComponent placeholder={'搜索资源'} onSearch={(value) => {
            this.props.history.push(`/search/${value}`)
        }}/>;
        return (
            <Header>
                <Logo>
                    <img src={require('../../img/icon.png')} style={{
                        width: '30px',
                        height: '30px',
                    }}/>
                </Logo>
                {
                    isMobile ?
                        ''
                        :
                        <WebTitle>Todo List</WebTitle>
                }
                <FlexDiv/>

                {searchComponent}

                <a type="primary" onClick={this.showLoginModal}>登陆</a>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <a type="primary" onClick={this.showRegister}>注册</a>

                <Modal
                    title={mode === Nav.MODE.LOGIN ? "登陆" : "注册"}
                    centered
                    visible={this.state.modalVisible}
                    footer={null}
                    onCancel={this.hideModal}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
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
                            mode === Nav.MODE.REGISTER ?
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
                                mode === Nav.MODE.LOGIN ?
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
                                {mode === Nav.MODE.LOGIN ? "登陆" : "注册"}
                            </Button>
                            {
                                mode === Nav.MODE.LOGIN ?
                                    <span>Or <a onClick={this.showRegister}>注册</a></span>
                                    :
                                    <span>Or <a onClick={this.showLoginModal}>登陆</a></span>
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </Header>
        );
    }
}

Nav.propTypes = {
    isMobile: PropTypes.bool,
    defaultSelectedKey: PropTypes.string,
};

Nav.defaultProps = {
    isMobile: false,
    defaultSelectedKey: LocalRouter.HOME,
};

const WrappedNav = Form.create()(Nav);

export default WrappedNav;