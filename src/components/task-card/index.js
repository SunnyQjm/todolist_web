import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import {
    BaseColor
} from '../base/base-component';
import moment from 'moment'
import Icon from 'antd/lib/icon';
import Tag from 'antd/lib/tag';

const radius = '8px';

const TaskCardBody = styled.div`
    background-color: white;
    border-radius: ${radius};
    display: flex;
    flex-direction: row;
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
    };
    margin: 8px 0px;
    justify-content: center;
    width: 100%;
    margin-right: 25px;
`;

const MyTag = styled.span`
    color: white;
    text-align: center;
    font-size: 1.8em;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: ${radius};
    border-bottom-left-radius: ${radius};
    flex-grow: 0;
    background-color: ${BaseColor.tag_color_3}
`;

const TaskCardContent = styled.div`
    margin-left: 10px;
    padding: 8px;
    flex-grow: 1;
`;

const Title = styled.span`
    font-size: 1.2em;
    margin-right: 20px;
`;

const ItemTags = styled.div`
    margin-top: 10px;
`;

const RemoveIcon = styled(Icon)`
    // position: absolute;
    right: 0px;
    top: 0px
    padding: 5px;
    &:hover {
        cursor: pointer;
    }
`;


class TaskCardComponent extends React.Component {

    state = {
        hover: false,
    };

    constructor(props) {
        super(props);
        this.dealOnMouseEnter = this.dealOnMouseEnter.bind(this);
        this.dealOnMouseLeave = this.dealOnMouseLeave.bind(this);
    }


    dealOnMouseEnter(e) {
        this.setState({
            hover: true,
        })
    }

    dealOnMouseLeave(e) {
        this.setState({
            hover: false,
        })
    }


    static judgeExpired(expire_date){
        return moment().valueOf() > parseInt(expire_date)
    }

    render() {
        let {content, expire_date, finished, priority, tags} = this.props.task;
        let {onRemove} = this.props;
        let {hover} = this.state;
        let tgs = [];
        if (!!tags) {
            tags.split(',').forEach(tag => {
                tag = tag.replace(/\s+/g, "");
                if (!!tag)
                    tgs.push(<Tag color={BaseColor.tag_color_4} key={tag}>{tag}</Tag>)
            });
        }

        let expired = TaskCardComponent.judgeExpired(expire_date);
        let leftTagBg = finished ? BaseColor.tag_color_3 : expired ? BaseColor.red : BaseColor.gray;
        //取得文件列表中最大的文件作为主标题
        return (
            <TaskCardBody {...this.props} onMouseEnter={this.dealOnMouseEnter} onMouseLeave={this.dealOnMouseLeave}>
                <MyTag style={{
                    backgroundColor: leftTagBg
                }}>
                    <Icon type={finished ? 'smile' : expired ? "frown" : "schedule"}/>
                </MyTag>
                <TaskCardContent id={'display-body'}>
                    <Title>
                        {`${content}`}
                    </Title>
                    <ItemTags>
                        <Tag color={BaseColor.tag_color_2}>优先级：{priority}</Tag>
                        {
                            finished ?
                                ""
                                :
                                <Tag
                                    color={BaseColor.tag_color_1}>截至时间: {moment(parseInt(expire_date)).format('YYYY-MM-DD')}</Tag>

                        }
                        {tgs}
                    </ItemTags>
                </TaskCardContent>

                {
                    hover ?
                        <RemoveIcon type={'close'} onClick={() => {
                            onRemove(this.props.task);
                        }}/>
                        :
                        ""
                }

            </TaskCardBody>
        )
    }
}

TaskCardComponent.propTypes = {
    task: PropTypes.shape({
            id: PropTypes.number,
            content: PropTypes.string,
            expire_date: PropTypes.number,
            tags: PropTypes.string,
            priority: PropTypes.number,
            finished: PropTypes.bool,
        }
    ),
    onRemove: PropTypes.func,
};

TaskCardComponent.defaultProps = {
    task: PropTypes.shape({
        id: 0,
        content: '',
        expire_date: moment().valueOf(),
        tags: '',
        priority: 1,
        finished: false,
    }),
    onRemove: (task) => {
    },

};

export default TaskCardComponent;