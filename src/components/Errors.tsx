import React from 'react';
import { Error } from 'types';
import { isArray } from 'util';
import { Alert } from 'antd';

interface Props {
    errors: Error
}

const Errors: React.FC<Props> = ({ errors }) => {

    let errors_list;

    for (let key in errors) {
        if (isArray(errors[key])) {
            errors_list = errors[key]!.map(value => {
                return <Alert message={value} type="error" showIcon />

            })
        }
    }


    return <div>{errors_list}</div>
}

export default Errors