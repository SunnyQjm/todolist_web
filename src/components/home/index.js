import React from 'react'
import {
    withRouter
} from 'react-router-dom';
import Tabs from 'antd/lib/tabs';
import styled from 'styled-components';
import {
    TaskCardComponent, AddTaskDrawer
} from '../index'
import Spin from 'antd/lib/spin';
import Menu from 'antd/lib/menu';
import DropDown from 'antd/lib/dropdown';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import {
    TodolistAPI
} from '../../config/API'
import 'rc-texty/assets/index.css';
import Texty from 'rc-texty';
import Pagination from 'antd/lib/pagination';
import Tag from "antd/lib/tag";
import {BaseColor} from "../base/base-component";
import QueueAnim from 'rc-queue-anim';


const TabPane = styled(Tabs.TabPane)`
    display: flex;
    flex-wrap: wrap;
`;

const HomeBody = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const WelcomeBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4em;
    height: 100%;
`;


const ToolBar = styled.div`
    margin-bottom: 20px;
`;


let last_category = 1;
let current_tab_key = 1;


class HomeComponent extends React.Component {
    getEnter = (e) => {
        switch (e.index) {
            case 0:
                return {
                    rotate: 90,
                    opacity: 0,
                    y: -60,
                };
            case 10:
            case 1:
                return {
                    y: -60,
                    x: -10,
                    opacity: 0,
                };
            case 9:
            case 2:
                return {
                    y: -60,
                    x: 20,
                    opacity: 0,
                };
            case 3:
                return {
                    y: 60,
                    opacity: 0,
                };
            case 8:
            case 4:
                return {
                    x: 30,
                    opacity: 0,
                };
            case 5:
                return {
                    enter: [
                        {
                            scale: 2,
                            opacity: 0,
                            type: 'set',
                        },
                        {scale: 1.2, opacity: 1, duration: 300},
                        {scale: 0.9, duration: 200},
                        {scale: 1.05, duration: 150},
                        {scale: 1, duration: 100},
                    ],
                    leave: {
                        opacity: 0, scale: 0,
                    },
                };
            case 6:
                return {
                    scale: 0.8,
                    x: 30,
                    y: -10,
                    opacity: 0,
                };
            case 7:
                return {
                    scale: 0.8,
                    x: 30,
                    y: 10,
                    opacity: 0,
                };
            default:
                return {
                    opacity: 0,
                };
        }
    };

    state = {
        showAddTaskModal: false,
        selectTask: null,
    };

    constructor(props) {
        super(props);
        this.handleOrderByMenuClick = this.handleOrderByMenuClick.bind(this);
        this.handleUpOrDownMenuClick = this.handleUpOrDownMenuClick.bind(this);
        this.dealOnTabCLick = this.dealOnTabCLick.bind(this);
        this.dealRemoveTask = this.dealRemoveTask.bind(this);
        this.makeTaskCard = this.makeTaskCard.bind(this);
        this.handleModifyTaskSubmit = this.handleModifyTaskSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
        this.makePagination = this.makePagination.bind(this);
        this.makeTab = this.makeTab.bind(this);
    }

    /**
     * 切换添加待办事项抽屉的展示状态
     * @param show
     */
    toggleAddTaskModal(show) {
        this.setState({
            showAddTaskModal: show,
        })
    }

    /**
     * 切换排序方式
     * @param e
     */
    handleOrderByMenuClick(e) {
        let {changeOrderBy, getTaskList, up} = this.props;
        changeOrderBy(e.key);

        //调整过后，重新获取数据
        getTaskList(last_category, up === 'up' ? e.key : `-${e.key}`);
    }

    /**
     * 切换升降序
     * @param e
     */
    handleUpOrDownMenuClick(e) {
        let {changeUpOrDown, getTaskList, orderBY} = this.props;
        changeUpOrDown(e.key);

        //调整过后，重新获取数据
        getTaskList(last_category, e.key === 'up' ? orderBY : `-${orderBY}`);
    }

    /**
     * 获取待办事项
     */
    loadNotFinishedTasks(page = -1) {
        let {getTaskList, notFinishedTasksNextPage, orderBY, up} = this.props;
        page = page > 0 ? page : notFinishedTasksNextPage;
        let orderStr = orderBY;
        if (!up)
            orderStr = `-${orderBY}`;
        getTaskList(TodolistAPI.GET_TASK_LIST.Category.NOT_FINISHED, orderStr, page);
        last_category = TodolistAPI.GET_TASK_LIST.Category.NOT_FINISHED;
    }


    /**
     * 获取已完成的事项
     */
    loadFinishedTasks(page = -1) {
        let {getTaskList, finishedTasksNextPage, orderBY, up} = this.props;
        page = page > 0 ? page : finishedTasksNextPage;
        let orderStr = orderBY;
        if (!up)
            orderStr = `-${orderBY}`;
        getTaskList(TodolistAPI.GET_TASK_LIST.Category.FINISHED, orderStr, page);
        last_category = TodolistAPI.GET_TASK_LIST.Category.FINISHED;
    }

    /**
     * 获取已过期的事项
     */
    loadExpiredTasks(page = -1) {
        let {getTaskList, expireTasksNextPage, orderBY, up} = this.props;
        page = page > 0 ? page : expireTasksNextPage;
        let orderStr = orderBY;
        if (!up)
            orderStr = `-${orderBY}`;
        getTaskList(TodolistAPI.GET_TASK_LIST.Category.EXPIRE, orderStr, page);
        last_category = TodolistAPI.GET_TASK_LIST.Category.EXPIRE;
    }

    /**
     * 处理列表切换
     * @param key
     */
    dealOnTabCLick(key, page = -1) {
        let judge = parseInt(key);

        // 记录当前处于哪个Tab
        current_tab_key = judge;
        switch (judge) {
            case 1:
                this.loadNotFinishedTasks(page);
                break;
            case 2:
                this.loadFinishedTasks(page);
                break;
            case 3:
                this.loadExpiredTasks(page);
                break;
        }
    }

    /**
     * 处理删除任务
     * @param task
     */
    dealRemoveTask(task) {
        let {removeTask} = this.props;
        removeTask(task, () => {        //删除成功
            this.dealOnTabCLick(current_tab_key);
        }, () => {                      //删除失败

        });
    }

    /**
     * 处理更新待办事项
     * @param values
     */
    handleModifyTaskSubmit(values, task) {
        this.toggleAddTaskModal(false);
        let {updateTask} = this.props;
        !!values && !!task && task.id && (values.id = task.id);
        updateTask(values, () => {      //更新成功
            this.dealOnTabCLick(current_tab_key);
        }, () => {                      //更新失败

        });
    }


    /**
     * 构造事项卡
     * @param task
     * @returns {*}
     */
    makeTaskCard(task) {
        return <TaskCardComponent task={task} key={task.id} onRemove={this.dealRemoveTask} onEditClick={task => {   //编辑更新
            this.setState({
                selectTask: task,
            });
            this.toggleAddTaskModal(true);
        }} onDoFinishClick={task => {           //标记完成
            let tgs = [];
            task.tags && task.tags.split(',').forEach(tag => {
                tag = tag.replace(/\s+/g, "");
                if (!!tag)
                    tgs.push(tag)
            });
            this.handleModifyTaskSubmit({...task, finished: true, tags: tgs}, task)
        }}/>
    }


    /**
     * 处理页面切换
     * @param page
     * @param pageSize
     */
    changePage(page, pageSize) {
        let {changePage} = this.props;
        changePage(page, current_tab_key);
        this.dealOnTabCLick(current_tab_key, page);
    }

    /**
     * 构造分页器
     * @param totalSize
     * @returns {*}
     */
    makePagination(totalSize) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: '50px',
            }}>
                <Pagination defaultCurrent={1} total={totalSize}
                            defaultPageSize={5} onChange={this.changePage}/>
            </div>
        )
    }


    /**
     * 构造TabPane
     * @param items
     * @param totalSize
     * @param tabTitle
     * @param key
     * @returns {*}
     */
    makeTab(items, totalSize, tabTitle, key) {
        return (
            <TabPane tab={tabTitle} key={key}>
                {
                    items.length > 0 ?
                        {items}
                        :
                        <div style={{
                            width: '100%',
                            height: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Spin size="large"/>
                        </div>
                }

                {this.makePagination(totalSize)}
            </TabPane>
        );
    }

    render() {
        let {
            isMobile, notFinishedTasks, finishedTasks, expireTasks, orderBY,
            up, isLogin, firstLoad,
            notFinishedTasksTotalSize, finishedTasksTotalSize, expireTasksTotalSize,
        } = this.props;
        let {showAddTaskModal, selectTask} = this.state;
        let headerContentWidth = isMobile ? '100%' : '1000px';
        if (isLogin && firstLoad)
            this.loadNotFinishedTasks();
        const sortedFiledMenu = (
            <Menu onClick={this.handleOrderByMenuClick}>
                <Menu.Item key="expire_date">按过期时间排序</Menu.Item>
                <Menu.Item key="priority">按优先级排序</Menu.Item>
            </Menu>
        );
        const upRoDownMenu = (
            <Menu onClick={this.handleUpOrDownMenuClick}>
                <Menu.Item key="up">升序</Menu.Item>
                <Menu.Item key="down">降序</Menu.Item>
            </Menu>
        );

        let notFinishedTaskItems = [];
        let finishedTaskItems = [];
        let expiredTaskItems = [];

        notFinishedTasks.forEach(task => {
            notFinishedTaskItems.push(this.makeTaskCard(task))
        });
        finishedTasks.forEach(task => {
            console.log(task);
            finishedTaskItems.push(this.makeTaskCard(task))
        });
        expireTasks.forEach(task => {
            expiredTaskItems.push(this.makeTaskCard(task))
        });
        return (
            <div style={{
                width: '100%',
            }}>
                <AddTaskDrawer title="更新待办事项" show={showAddTaskModal} isMobile={isMobile} onClose={() => {
                    this.toggleAddTaskModal(false)
                }} onSubmit={this.handleModifyTaskSubmit} wrappedComponentRef={form => {
                    this.form = form;
                }} task={selectTask}/>

                {
                    isLogin ?
                        <HomeBody style={{
                            height: '100%',
                        }}>
                            <ToolBar>
                                <DropDown overlay={upRoDownMenu}>
                                    <Button style={{marginLeft: 8}}>
                                        {
                                            up === 'up' ? '升序'
                                                :
                                                '降序'
                                        }<Icon type="down"/>
                                    </Button>
                                </DropDown>
                                <DropDown overlay={sortedFiledMenu}>
                                    <Button style={{marginLeft: 8}}>
                                        {orderBY === 'expire_date' ?
                                            '按过期时间排序' :
                                            '按优先级排序'} <Icon type="down"/>
                                    </Button>
                                </DropDown>
                            </ToolBar>
                            <Tabs tabPosition={isMobile ? 'top' : 'left'} style={{
                                width: headerContentWidth
                            }} onTabClick={this.dealOnTabCLick}>
                                {this.makeTab(notFinishedTaskItems, notFinishedTasksTotalSize, '待办事项', "1")}
                                {this.makeTab(finishedTaskItems, finishedTasksTotalSize, '已完成', "2")}
                                {this.makeTab(expiredTaskItems, expireTasksTotalSize, '已超期', "3")}
                            </Tabs>
                        </HomeBody>
                        :
                        <WelcomeBody style={{
                            height: '500px',
                        }}>
                            <Texty enter={this.getEnter} leave={this.getEnter}>Welcome to TodoList</Texty>
                        </WelcomeBody>
                }
            </div>
        );
    }
}

export default withRouter(HomeComponent)