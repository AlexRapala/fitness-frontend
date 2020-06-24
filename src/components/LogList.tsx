import React, { useEffect, useState } from 'react';
import { List, Button, Form, Input, Col, Row, Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import UserStore from 'stores/UserStore';
import { observer } from 'mobx-react';
import UIStore from 'stores/UIStore';
import { Log } from 'types';

const LogList = observer(() => {
    const [logs, setLogs] = useState([]);
    const [lifts, setLifts] = useState([]);


    const getLogs = () => {
        UserStore.getLogs()
            .then(resp => {
                setLogs(resp?.data);
            })
    }

    useEffect(() => {
        UIStore.setSelectedKeys(['log'])
        getLogs();


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
                style={{width: '50%'}}
                dataSource={logs}
                renderItem={item => {
                    // casts it to Log type
                    let row = (item as Log);

                    return (
                        <List.Item
                            actions={[<Link to={`/log/${row.id}`} key={row.id}>Add Lifts</Link>]}
                                >
                                <List.Item.Meta
                                    title={<Link to={`/log/${row.id}`}>{row.name}</Link>}
                                    description={`Created on ${row.created}`}
                                />
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