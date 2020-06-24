import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { observer } from 'mobx-react';
import UserStore from 'stores/UserStore';
import Errors from 'components/Errors';
import LoginForm from './LoginForm';
import RegisterForm from './Register';

const Login = observer(() => {
    const [isRegistering, setIsRegistering] = useState(false);


    return (
        <Card>
            {UserStore.errors && <Errors errors={UserStore.errors} />}
            {!isRegistering ? <LoginForm /> : <RegisterForm />}
            <Button onClick={() => setIsRegistering(!isRegistering)}>{!isRegistering ? 'Register' : 'Cancel'}</Button>
        </Card>
    )
});

export default Login;