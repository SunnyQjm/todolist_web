import React from 'react';
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const {Option} = Select;

class AddTaskDrawer extends React.Component {

    judgeDateSelectable(m) {
        //如果选择的日期比当前日期后则可以选择
        return moment().valueOf() < m.valueOf();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {show, isMobile, onClose, onSubmit} = this.props;
        return (
            <Drawer
                title="添加待办事项"
                width={isMobile ? '90%' : '30%'}
                placement="right"
                onClose={onClose}
                maskClosable={false}
                visible={show}
                style={{
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                }}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="待办事项描述">
                                {getFieldDecorator('content', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入待办事项描述',
                                        },
                                    ],
                                })(<Input.TextArea rows={4} placeholder="请输入待办事项描述"/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col>
                            <Form.Item label="优先级">
                                {getFieldDecorator('priority', {
                                    rules: [{required: true, message: '请选择优先级'}],
                                })(
                                    <Select placeholder={'请选择优先级'}>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="截至日期">
                                {getFieldDecorator('expire_date', {
                                    rules: [{required: true, message: 'please enter url'}],
                                })(
                                    <DatePicker
                                        disabledDate={currentDate => {
                                            console.log(currentDate);

                                            return !!currentDate && moment().valueOf() > currentDate.valueOf();
                                        }}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col>
                            <Form.Item label="请输入标签">
                                {getFieldDecorator('tags', {
                                    rules: [{required: false, message: 'Please select an owner'}],
                                })(
                                    <Select
                                        mode="tags"
                                        style={{width: '100%'}}
                                        placeholder="Tags Mode"
                                        onChange={this.handleChange}
                                    >
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                    <Button
                        style={{
                            marginRight: 8,
                        }}
                        onClick={onClose}
                    >
                        取消
                    </Button>
                    <Button onClick={() => {
                        this.props.form.validateFields((err, values) => {
                            if (!err) {
                                onSubmit(values);
                            }
                        });
                    }} type="primary">提交</Button>
                </div>
            </Drawer>
        );
    }
}

const WrapperComponent = Form.create()(AddTaskDrawer);

WrapperComponent.propTypes = {
    show: PropTypes.bool,
    isMobile: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
};

WrapperComponent.defaultProps = {
    show: false,
    isMobile: false,
    onClose: () => {

    },
    onSubmit: () => {

    }
};


export default WrapperComponent;