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
`;

class Nav extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {isMobile, selectedKey} = this.props;
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
                <WebTitle>Todo List</WebTitle>
                {
                    isMobile ?
                        searchComponent
                        :
                        ''
                }
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