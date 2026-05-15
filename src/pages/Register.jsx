import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { url } from '../../shared'
import { LoginContext } from '../contexts/LoginContext'

const Register = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { loggedIn, setLoggedIn } = useContext(LoginContext)
    const navigate = useNavigate()

    async function register(e) {
        e.preventDefault()
        const register_endpoint = 'api/register/'
        const user = {
            name,
            surname, 
            email, 
            password, 
            confirmPassword
        }
        try {
            if (password === confirmPassword) {
                const response = await fetch(url + register_endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'first_name': user.name.trim(),
                        'last_name': user.surname.trim(),
                        'email': user.email,
                        'password': user.password
                    })
                })
                console.log(response.status)
                
                const result = await response.json()
                if (response.status === 201) {
                    console.log(result)
                    localStorage.clear()
                    localStorage.setItem('token', result.access)
                    localStorage.setItem('refresh', result.refresh)
                    setLoggedIn(true)
                    navigate('/')
                }
            }
            console.log(user)
        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <div className='px-3 pt-5'>
            <form className='flex flex-col gap-1 mb-2' onSubmit={(e) => register(e)} >
                <fieldset >
                    <legend className='text-xl font-medium'>
                        Criar sua conta
                    </legend>

                    <div className="flex flex-col gap-1 mt-2">
                        <label htmlFor="name" className='text-lg'>Primeiro nome:</label>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            className="login-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="surname" className='text-lg'>Sobrenome:</label>
                        <input
                            type="text"
                            name='surname'
                            id='surname'
                            className="login-input"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
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
                        <label htmlFor="confirmPassword" className='text-lg'>Confirmar Senha:</label>
                        <input
                            type="password"
                            name='password'
                            id='confirmPassword'
                            className="login-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <input
                            type="submit"
                            value="Criar"
                            className='login-submit cursor-pointer' />
                    </div>
                </fieldset>
            </form>
            <Link to={'/login'}>Ja tem uma conta?</Link>
        </div>
    )
}

export default Register