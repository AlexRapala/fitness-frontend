import React from 'react';
import ReactDOM from 'react-dom';
import Login from 'components/auth/Login';
import renderer from 'react-test-renderer';

it("Login renders correctly", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
})