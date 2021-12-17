import { Button } from '@chakra-ui/react';
import React from 'react';
import Header from '../components/Header';

const Login = () => {
    return (
        <div id='page-login'>
            <Header inicio='hidden' sobre='hidden' podcaster='hidden' login='hidden'/>
            <p>Bem-vindo!</p>
            <h1>Acesse sua conta</h1>
            <Button>Entrar com strateegia</Button>
            <Button>Cadastrar</Button>
        </div>
    );
};

export default Login;
