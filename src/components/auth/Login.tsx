import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { observer } from 'mobx-react';
import UserStore from 'stores/UserStore';
import Errors from 'components/Errors';

const Login = observer(() => {

    const onFinish = (values: any) => {
        UserStore.login(values.username, values.password);
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    }

    return (
        <Card>
            {UserStore.errors && <Errors errors={UserStore.errors} />}
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button loading={UserStore.loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
});

export default Login;