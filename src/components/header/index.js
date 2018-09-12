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
    justify-content: center;
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

const HeaderContent = styled.div`
    width: 1000px;
    display: flex;
    align-items: center;
`;

/**
 * 占位块，在flex布局中占满剩余空间
 */
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
        this.doLogout = this.doLogout.bind(this);
    }

    /**
     * 显示登陆模态框
     */
    showLoginModal() {
        this.setState({
            modalVisible: true,
            mode: Nav.MODE.LOGIN
        })
    }

    /**
     * 显示注册模态框
     */
    showRegister() {
        this.setState({
            modalVisible: true,
            mode: Nav.MODE.REGISTER
        })
    }

    /**
     * 隐藏登陆注册模态框
     */
    hideModal() {
        this.setState({
            modalVisible: false
        })
    }

    /**
     * 退出登陆
     */
    doLogout() {
        this.setState({
            modalVisible: false,
        });
        const {logout} = this.props;
        logout();
    }

    /**
     * 处理表单提交
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        let {login, register} = this.props;
        let isLogin = this.state.mode === Nav.MODE.LOGIN;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(isLogin)
                    login(values);
                else
                    register(values);
            }
        });
    };

    render() {
        const {isMobile, isLogin} = this.props;
        const {mode} = this.state;
        const {getFieldDecorator} = this.props.form;
        let searchComponent = <SearchComponent placeholder={'搜索资源'} onSearch={(value) => {
            this.props.history.push(`/search/${value}`)
        }}/>;

        let headerContentWidth = isMobile ? '100%' : '1000px';
        return (
            <Header>
                <HeaderContent style={{
                    width: headerContentWidth,
                }}
                >
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


                    {
                        isLogin ?           //如果没有登陆就显示登陆和注册入口
                            <a type="primary" onClick={this.doLogout}>登出</a>
                            :
                            <div>
                                <a type="primary" onClick={this.showLoginModal}>登陆</a>
                                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <a type="primary" onClick={this.showRegister}>注册</a>

                                <Modal
                                    title={mode === Nav.MODE.LOGIN ? "登陆" : "注册"}
                                    centered
                                    visible={this.state.modalVisible && !isLogin}
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
                            </div>
                    }
                </HeaderContent>

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