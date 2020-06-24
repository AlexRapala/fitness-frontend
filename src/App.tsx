import React, { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { BrowserRouter} from 'react-router-dom';
import Login from 'components/auth/Login';
import Controller from 'components/Controller';
import UserStore from 'stores/UserStore';
import { observer } from 'mobx-react';

const App = observer(() => {

    useEffect(() => {
        if (UserStore.token) {
            UserStore.getUser();
        }
        else {
            UserStore.setAuthenticated(false);
        }
    }, [])

    if (UserStore.isAuthenticated) {
        return (
            <BrowserRouter>
                <Controller />
            </BrowserRouter>
        )

    }

    if (UserStore.isAuthenticated === false) {
        return (
            <Login />
        );
    }

    return <Spin />

})

export default App;
