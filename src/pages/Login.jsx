import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { url } from '../../shared'
import { LoginContext } from '../contexts/LoginContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {loggedIn, setLoggedIn} = useContext(LoginContext);
    
    const navigate = useNavigate()
    const location = useLocation()

    async function login(e) {
        e.preventDefault()
        const token_endpoint = 'api/token/'
        const user = {
            email,password
        }
        try{
            const response = await fetch(url+token_endpoint,{
                method: 'POST',
                headers:{'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    email: user.email,
                    password:user.password,
                })
            })
            const result = await response.json()
            console.log(result)
            if (response.status === 200) {
                localStorage.clear()
                localStorage.setItem('token', result.access)
                localStorage.setItem('refresh', result.refresh)
                setLoggedIn(true)
                if (location.state?.previousUrl){
                    navigate(location.state.previousUrl)
                }else{
                    navigate('/')
                }
            }
        }catch(e){
            console.log(e.message)
        }
        
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
                            className='login-submit cursor-pointer' />
                    </div>
                </fieldset>
            </form>
            <Link to={'/register'}>Não tem uma conta?</Link>
        </div>
    )
}

export default Login