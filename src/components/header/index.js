import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LocalRouter from '../../LocalRouter'
import {
    BaseColor
} from '../base/base-component';
import {
    SearchComponent,
    LoginRegisterModal,
    AddTaskDrawer,
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
    flex-shrink: 0;
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

class Nav extends React.Component {

    static MODE = {
        LOGIN: 'login',
        REGISTER: 'register',
    };

    state = {
        modalVisible: false,
        showAddTaskModal: false,
    };

    constructor(props) {
        super(props);
        this.showRegister = this.showRegister.bind(this);
        this.showLoginModal = this.showLoginModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.toggleAddTaskModal = this.toggleAddTaskModal.bind(this);
        this.handleAddTaskSubmit = this.handleAddTaskSubmit.bind(this);
    }

    /**
     * 切换添加待办事项抽屉的展示状态
     * @param show
     */
    toggleAddTaskModal(show){
        this.setState({
            showAddTaskModal: show,
        })
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
    handleLoginOrRegisterSubmit = (e, form) => {
        e.preventDefault();
        let {login, register} = this.props;
        let isLogin = this.state.mode === Nav.MODE.LOGIN;
        form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                if(isLogin)
                    login(values);
                else
                    register(values);
            }
        });
    };


    /**
     * 处理添加一个待办事项的表单提交
     * @param values
     */
    handleAddTaskSubmit(values) {

        // 关闭抽屉
        this.toggleAddTaskModal(false);
        console.log(values);
        console.log(values.expire_date.valueOf());
        console.log(parseInt(values.priority));
        let {addTask} = this.props;
        addTask(values)
    }


    render() {
        const {isMobile, isLogin} = this.props;
        const {mode, showAddTaskModal} = this.state;
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

                    <img src={require('../../img/add.png')} style={{
                        width: '30px',
                        height: '30px',
                        marginRight: '20px',
                        cursor: 'pointer',
                    }} onClick={() => {
                        this.toggleAddTaskModal(true);
                    }}/>

                    <AddTaskDrawer show={showAddTaskModal} isMobile={isMobile} onClose={() => {
                        this.toggleAddTaskModal(false)
                    }} onSubmit={this.handleAddTaskSubmit}/>

                    {
                        isLogin ?           //如果没有登陆就显示登陆和注册入口
                            <a type="primary" onClick={this.doLogout}>登出</a>
                            :
                            <div>
                                <a type="primary" onClick={this.showLoginModal}>登陆</a>
                                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <a type="primary" onClick={this.showRegister}>注册</a>

                                <LoginRegisterModal
                                    title={mode === Nav.MODE.LOGIN ? "登陆" : "注册"}
                                    mode={mode}
                                    centered
                                    visible={this.state.modalVisible && !isLogin}
                                    footer={null}
                                    onCancel={this.hideModal}
                                    onSubmit={this.handleLoginOrRegisterSubmit}
                                    showLogin={this.showLoginModal}
                                    showRegister={this.showRegister}
                                >

                                </LoginRegisterModal>
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


export default Nav;