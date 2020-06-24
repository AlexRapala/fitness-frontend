import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from 'components/Home';
import LogRecord from 'components/LogRecord';
import LogList from 'components/LogList';
import {observer} from 'mobx-react';
import UIStore from 'stores/UIStore';

const { Header, Content } = Layout;

const Controller: React.FC = observer(() => {
    return (
        <Layout className="fitness-layout">
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={UIStore.selectedKeys}>
                    <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="log"><Link to="/log">Your Training Logs</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ height: '100%', padding: '50px'}}>
                <div className="site-layout-content">
                    <Switch>
                        <Route path="/" exact render={() => <Home />} />
                        <Route path="/log/:id" exact render={() => <LogRecord />} /> 
                        <Route path="/log" exact render={() => <LogList />} />
                    </Switch>
                </div>
            </Content>
        </Layout>
    )
})

export default Controller;