import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
import UserStore from 'stores/UserStore';

const RegisterForm = observer(() => {

    const onFinish = (values: any) => {
        UserStore.register(values.username, values.email, values.password1, values.password2);
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
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input autoComplete="email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password1"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Form.Item
                label="Re-enter Password"
                name="password2"
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

export default RegisterForm;