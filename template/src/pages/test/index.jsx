import React, { Component } from 'react';
import { getInitialProps } from 'dace-plugin-redux';
import { fetchTest } from './action';
import reducer from './reducer';
import Layout from '../../layouts/default';

@getInitialProps({
  reducer,
  promise: ({ store: { dispatch } }) => {
    const promises = [];
    promises.push(dispatch(fetchTest()));
    return Promise.all(promises);
  }
})
export default class Test extends Component {
  render() {
    return (
      <Layout>
        <div>test</div>
      </Layout>
    );
  }
}
