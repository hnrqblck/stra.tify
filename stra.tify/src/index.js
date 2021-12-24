import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './components/providers/auth';

import './styles/global.scss';


ReactDOM.render(
  <AuthProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </AuthProvider>,
  document.getElementById('root')
);

