import React from 'react'
import {
    withRouter
} from 'react-router-dom';
import Tabs from 'antd/lib/tabs';
import styled from 'styled-components';
import {
    TaskCardComponent
} from '../index'

const TabPane = styled(Tabs.TabPane)`
    display: flex;
    flex-wrap: wrap;
`;

const HomeBody = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

class HomeComponent extends React.Component {

    render() {
        let {isMobile} = this.props;
        let headerContentWidth = isMobile ? '100%' : '1000px';

        return (
            <HomeBody>
                <Tabs tabPosition={isMobile ? 'top' : 'left'} style={{
                    width: headerContentWidth
                }}>
                    <TabPane tab="待办事项" key="1">
                        <TaskCardComponent task={{
                            content: '今天上午开需求分析会议',
                            id: '5',
                            finished: true,
                            tags: '会议, 理想, 做梦',
                        }}/>
                        <TaskCardComponent/>
                        <TaskCardComponent/>

                    </TabPane>
                    <TabPane tab="已完成" key="2">Content of Tab 2</TabPane>
                    <TabPane tab="已超期" key="3">Content of Tab 3</TabPane>
                </Tabs>
            </HomeBody>
        );
    }
}

export default withRouter(HomeComponent)