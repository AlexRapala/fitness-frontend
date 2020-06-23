import React, { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import Login from 'components/auth/Login';
import UserStore from 'stores/UserStore';
import { observer } from 'mobx-react';

const App = observer(() => {

    useEffect(() => {
        if(UserStore.token) {
            UserStore.getUser();
        }
    }, [])

    if(UserStore.isAuthenticated) {
        return <div>Hello</div>
    }
    return (
        <Login />
    );
})

export default App;
