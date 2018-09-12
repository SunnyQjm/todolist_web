import React from 'react';
import {Layout} from 'antd';
import styled from 'styled-components';
import {
    BaseColor
} from '../../components/base/base-component'

const {Footer} = Layout;

const MyFoot = styled(Footer)`
    flex-grow: 0;
    background-color: ${BaseColor.lightGray}
`;

class FooterComponent extends React.Component{
    render(){
        return (
            <MyFoot
                theme={'light'}
                style={{textAlign: 'center'}}>
                Copyright ©2018 Created by Ming.J
            </MyFoot>
        );
    }
}

export default FooterComponent;
