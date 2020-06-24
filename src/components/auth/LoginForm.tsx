import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
import UserStore from 'stores/UserStore';

const LoginForm = observer(() => {

    const onFinish = (values: any) => {
        UserStore.login(values.username, values.password);
    }

    return (
        <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input autoComplete="username" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password autoComplete="current-password" />
            </Form.Item>

            <Form.Item>
                <Button loading={UserStore.loading} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
});

export default LoginForm;