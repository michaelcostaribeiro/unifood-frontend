import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { url } from '../../shared'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')
    
    const navigate = useNavigate()
    const location = useLocation()

    async function login(e) {
        e.preventDefault()
        const token_endpoint = 'api/token'
        const user = {
            username,password
        }
        try{
            const response = await fetch(url+token_endpoint,{
                method: 'POST',
                headers:{'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    username: user.username,
                    password:user.password,
                })
            })
            const result = await response.json()
            console.log(result)
            if (response.status === 200) {
                localStorage.clear()
                localStorage.setItem('token', result.token)
                localStorage.setItem('refresh', result.refresh)
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
                        <label htmlFor="username" className='text-lg'>Nome:</label>
                        <input
                            type="text"
                            name='username'
                            id='username'
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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