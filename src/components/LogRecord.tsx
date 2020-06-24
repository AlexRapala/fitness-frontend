import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Input, InputNumber, Select, Table } from 'antd';
import UserStore from 'stores/UserStore';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Lift } from 'types';


const LogRecord = (props) => {

    const [logXLift, setLogXLift] = useState([])
    const [lifts, setLifts] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const getLogLifts = () => {
        UserStore.getLogXLift(id)
            .then(resp => {
                setLogXLift(resp?.data);
            })
    }

    useEffect(() => {
        getLogLifts();
        UserStore.getLifts()
            .then(resp => {
                setLifts(resp?.data);
            });
    }, [])

    const columns = [
        {
            title: 'Lift',
            dataIndex: 'lift',
            render: (text, record) => {
                if (lifts.length > 0) {
                    let _lifts = (lifts[record.lift - 1] as Lift);
                    return _lifts.name;
                }
                return null;
            }
        },
        {
            title: 'Sets',
            dataIndex: 'sets',
        },
        {
            title: 'Repetitions',
            dataIndex: 'repetitions',
        },
        {
            title: 'Weight Lifted',
            dataIndex: 'weight',
        },
        {
            title: 'Date',
            dataIndex: 'lifted_date',
        },
    ]

    const onFinish = (values) => {
        const data = {
            ...values,
            log: id,
            owner: UserStore.user?.pk,
            lifted_date: moment().format('YYYY-MM-DD HH:mm')
        }
        UserStore.newLogXLift(data)
            .then(resp => {
                getLogLifts();
            })
    }

    const lift_options = lifts.map(record => {
        const _record = (record as Lift);
        return (
            <Select.Option value={_record.id}>{_record.name}</Select.Option>
        )
    })

    return (
        <React.Fragment>
            <Button onClick={() => history.goBack()}>Go Back</Button>
            <Table
                dataSource={logXLift}
                columns={columns}
                pagination={false}
            />
            <Form layout="vertical" name="new-lift" onFinish={onFinish}>
                <Row>
                    <Col md={4} sm={24}>
                        <Form.Item label="Lift" name="lift" rules={[{ required: true, message: 'Please input an exercise!' }]}>
                            <Select style={{width: 150}} defaultValue={"Select a Lift"}>
                                {lift_options}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={4} sm={24}>

                        <Form.Item label="Sets" name="sets" rules={[{ required: true, message: 'Please input your sets!' }]}>
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col md={4} sm={24}>
                        <Form.Item label="Repetitions" name="repetitions" rules={[{ required: true, message: 'Please input your repetitions!' }]}>
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col md={4} sm={24}>
                        <Form.Item label="Weight Lifted" name="weight" rules={[{ required: true, message: 'Please input your weight lifted!' }]}>
                            <InputNumber step={0.01} />
                        </Form.Item>
                    </Col>
                    <Col md={4} sm={24}>
                        <Button htmlType="submit">Create New Log</Button>

                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    )
}

export default LogRecord;