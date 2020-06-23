import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import UIStore from 'stores/UIStore';

const Home: React.FunctionComponent<any> = () => {
    useEffect(() => {
        UIStore.setSelectedKeys(['home']);
    }, [])
    
    return <div><Link to="/log">Create a training log!</Link></div>
}

export default Home;