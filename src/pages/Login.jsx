import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    function login(e) {
        e.preventDefault()
        const user = {
            email,password
        }
        console.log(user)
    }

    return (
        <div className='px-3 pt-5'>
            <form className='flex flex-col gap-1 mb-2' onSubmit={(e) => login(e)}>
                <fieldset >
                    <legend className='text-xl font-medium'>
                        Entrar com sua conta
                    </legend>

                    <div className="flex flex-col gap-1 mt-2">
                        <label htmlFor="email" className='text-lg'>Email:</label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password" className='text-lg'>Senha:</label>
                        <input
                            type="password"
                            name='password'
                            id='password'
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="submit"
                            value="Entrar"
                            className='login-submit' />
                    </div>
                </fieldset>
            </form>
            <Link to={'/register'}>Não tem uma conta?</Link>
        </div>
    )
}

export default Login