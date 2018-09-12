import React from 'react'

import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom'
import LocalRouter from '../../LocalRouter'
import {
    BaseColor
} from '../base/base-component';
import {
    SearchComponent
} from '../index'

const {Item} = Menu;

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
`;

const MyMenu = styled(Menu)`
    line-height: 64px;
    background-color: transparent;
    display: flex;
`;

const MyItem = styled(Item)`

`;

const MyDropDown = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
`;


class Nav extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleMobileMenuClick = this.handleMobileMenuClick.bind(this);
        this.dealOnMenuItemClick = this.dealOnMenuItemClick.bind(this);
    }

    handleMobileMenuClick(e) {
        const {onSelect} = this.props;
        onSelect && onSelect(e);
    }

    componentDidMount() {
        let {changeSelectedKey} = this.props;
        // 根据当前地址栏的URL，判断当前应该是哪个菜单项被选中
        let selectedKey = '/' + document.location.pathname.split('/').pop();
        changeSelectedKey({
            key: selectedKey
        });
    }

    dealOnMenuItemClick(key) {
        let {changeSelectedKey} = this.props;
        changeSelectedKey({
            key: key
        });
    }

    render() {
        const {isMobile, selectedKey} = this.props;
        const menuItems = [
            <MyItem key={LocalRouter.HOME} onClick={() => {
                this.dealOnMenuItemClick(LocalRouter.HOME)
            }}><Link to={LocalRouter.HOME}>首页</Link></MyItem>,
            <MyItem key={LocalRouter.VIDEO} onClick={() => {
                this.dealOnMenuItemClick(LocalRouter.VIDEO)
            }}><Link to={LocalRouter.VIDEO}>影视</Link></MyItem>,
            <MyItem key={LocalRouter.LITTLE_TOOL} onClick={() => {
                this.dealOnMenuItemClick(LocalRouter.LITTLE_TOOL)
            }}><Link to={LocalRouter.LITTLE_TOOL}>推荐</Link></MyItem>,
            <MyItem key={LocalRouter.UPLOAD} onClick={() => {
                this.dealOnMenuItemClick(LocalRouter.UPLOAD)
            }}><Link to={LocalRouter.UPLOAD}>上传</Link></MyItem>,
            <MyItem key={LocalRouter.P2P_SHARE} onClick={() => {
                this.dealOnMenuItemClick(LocalRouter.P2P_SHARE)
            }}><Link to={LocalRouter.P2P_SHARE}>P2P</Link></MyItem>

        ];
        let dropDownMenu = (
            <Menu
                theme={'light'}
                selectedKeys={[selectedKey]}
            >
                {menuItems}
            </Menu>
        );
        let menu = isMobile ?
            <MyDropDown>
                <Dropdown overlay={dropDownMenu} trigger={['click']} style={{
                    color: 'white',
                }}>
                <span style={{
                    color: 'white',
                    fontSize: '1.8em'
                }}>
                    <Icon type="bars" style={{
                        color: BaseColor.color_apptheme
                    }}/>
                </span>
                </Dropdown>
            </MyDropDown>
            :
            <MyMenu
                theme="light"
                mode="horizontal"
                selectedKeys={[selectedKey]}
            >
                {menuItems}
            </MyMenu>;

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
                        searchComponent
                        :
                        ''
                }
                {menu}
                {
                    isMobile ?
                        ''
                        :
                        searchComponent
                }
            </Header>
        );
    }
}

Nav.propTypes = {
    isMobile: PropTypes.bool,
    defaultSelectedKey: PropTypes.string,
    onSelect: PropTypes.func,
};

Nav.defaultProps = {
    isMobile: false,
    defaultSelectedKey: LocalRouter.HOME,
    onSelect: (item, key, selectedKeys) => {
    }
};


export default Nav;