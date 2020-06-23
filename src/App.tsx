import React, { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Button, Spin } from 'antd';
import Login from 'components/auth/Login';
import UserStore from 'stores/UserStore';
import { observer } from 'mobx-react';

const App = observer(() => {

    useEffect(() => {
        if(UserStore.token) {
            UserStore.getUser();
        }
        else {
            UserStore.setAuthenticated(false);
        }
    }, [])

    if(UserStore.isAuthenticated) {
        return <div>Hello</div>
    }

    if(UserStore.isAuthenticated === false) {
        return (
            <Login />
        );
    }

    return <Spin />
    
})

export default App;
