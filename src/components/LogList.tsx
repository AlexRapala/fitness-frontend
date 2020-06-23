import React, { useEffect, useState } from 'react';
import { List, Button, Form, Input, Col, Row, Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import UserStore from 'stores/UserStore';
import { observer } from 'mobx-react';
import UIStore from 'stores/UIStore';

interface Log {
    id: number,
    name: string,
    created: string,
    owner: number
}

const LogList = observer(() => {
    const [logs, setLogs] = useState([]);
    const [lifts, setLifts] = useState([]);
    const [visible, setVisible] = useState(false);


    const getLogs = () => {
        UserStore.getLogs()
            .then(resp => {
                setLogs(resp?.data);
            })
    }

    useEffect(() => {
        UIStore.setSelectedKeys(['log'])
        getLogs();

        UserStore.getLifts()
            .then(resp => {
                setLifts(resp?.data);
            });
    }, []);

    const onFinish = (values) => {
        UserStore.newLog(values.name)
            .then(resp => {
                getLogs();
            })
    }

    return (
        <React.Fragment>
            <List
                dataSource={logs}
                renderItem={item => {
                    // casts it to Log type
                    let row = (item as Log);

                    return (
                        <List.Item>
                            <Descriptions style={{width: '100%'}} title={row.name} bordered>
                                <Descriptions.Item label="Add Lifts"><Link to={`/log/${row.id}`}>Here</Link></Descriptions.Item>
                    <Descriptions.Item label="Created Time">{row.created}</Descriptions.Item>
                            </Descriptions>        
                        </List.Item>
                    )
                }}
            />
            <Form name="new-log" onFinish={onFinish}>
                <Row>
                    <Col span={6}>
                        <Form.Item name="name" rules={[{ required: true, message: 'Please input a name!' }]}>
                            <Input placeholder={"Name your Log"} />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Button htmlType="submit">Create New Log</Button>
                    </Col>
                </Row>
            </Form>

        </React.Fragment>
    )
})

export default LogList;