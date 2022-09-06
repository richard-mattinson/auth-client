import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

export default function App() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [registerResponse, setRegisterResponse] = useState('');
    const [loginResponse, setLoginResponse] = useState('');

    const register = async (event) => {
        event.preventDefault();
        // Write your register code here
        try {
            const { username, password } = user
            if(!username || !password) {
                setRegisterResponse(`Please enter a username and password`)
            }
            await fetch("http://www.localhost:4000/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        })
        setRegisterResponse(`Thank you for registering ${username}`)
        } catch (error) {
        setRegisterResponse(`Error: registration failed`)
        }
    };

    const login = async (event) => {
        event.preventDefault();
        // Write your login code here
        try {
            const { username, password } = user
            if(!username || !password) {
                setLoginResponse(`Please enter your username and password`)
            }
            await fetch("http://www.localhost:4000/login", {
                
            })
        } catch {

        }
        
    };






    // You can safely ignore everything below this line, it's just boilerplate
    // so you can focus on the exercise requirements

    const handleChange = (e) => {
        const { value, name } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    return (
        <div className="App">

            <h1>Register</h1>

            <Form
                handleSubmit={register}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />

            {registerResponse && <p>{registerResponse}</p>}

            <h1>Login</h1>

            <Form
                handleSubmit={login}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />

            {loginResponse && <p>{loginResponse}</p>}

        </div>
    );
}
