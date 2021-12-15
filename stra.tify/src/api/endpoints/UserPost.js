import React from 'react';
import { apiStrateegia } from '../../services/api';

const UserPost = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [terms, setTerms] = React.useState(false);

    const createUser = async (email, name, password, terms) => {
        await apiStrateegia('/users/v1/user/signup', {
            method: "POST",
            auth: {
                email: email,
                name: name,
                password: password,
                term_accepted: terms,
            },
        })
            .then(res => console.log(res))
            .catch(e => console.log(e));
        };

    function handleSubmit(event) {
        event.preventDefault();
        createUser(email, name, password, terms);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type='text'
                    placeholder='Nome'
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>
                <input
                    type='email'
                    placeholder='E-mail'
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                />
            </div>
            <div>
                <input
                    type='password'
                    placeholder='Senha'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <div>
                <input
                    type='checkbox'
                    value='Termos'
                    checked={terms}
                    onChange={({ target }) => setTerms(target.checked)}
                />
                <label>Li e aceito os <a href='#'>termos de uso</a></label>
            </div>
            <button>Enviar</button>
        </form>
    );
};

export default UserPost;
