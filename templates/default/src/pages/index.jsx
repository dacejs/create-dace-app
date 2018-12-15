import React from 'react';
import { Head } from 'dace';
import Layout from '../layouts/default';

const title = 'Home';

export default () => (
  <Layout>
    <Head>
      <title>{title}</title>
    </Head>
    <h1>{title}</h1>
  </Layout>
);
