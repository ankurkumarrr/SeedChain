import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Layout = (props) => {
  return (
    <Container>
        <Header/>
        {props.children}
    </Container>
  );
};

export default Layout;
