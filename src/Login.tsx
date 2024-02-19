import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

interface User {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [user, setUser] = useState<User>({ email: '', password: '' });
    const navigate = useNavigate(); // useNavigate hook 추가

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://lighthouse1.site/auth/login', user);
            const token = response.data.token;
            console.log(token)

            // save the token into local storage
            localStorage.setItem('token', token);

            alert('로그인 되었습니다.');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='LoginForm'>
                <form onSubmit={handleSubmit}>
                    <div className='WritingL'>
                        <div className='LoginLeft'>
                            <label className='LoginName'>Password: </label> &nbsp;&nbsp;
                            <label className='LoginName'>Email: </label> &nbsp;&nbsp;
                        </div>
                        <div className='LoginRight'>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className='LoginInput'
                            />
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className='LoginInput'
                            />
                        </div>
                    </div>
                    <button type="submit" className='LoginBtn'>Login</button>
                </form>
                <button onClick={() => navigate('/Join')} className='LoginBtn'>Join</button>
            </div>
        </>
    );
};

export default Login;
