import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function register(e) {
        e.preventDefault()
        const user = {
            name,surname,email,password,confirmPassword
        }
        console.log(user)
    }
  return (
      <div className='px-3 pt-5'>
          <form className='flex flex-col gap-1 mb-2' onSubmit={(e)=>register(e)} >
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
                          onChange={(e)=>setName(e.target.value)}
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
                          className='login-submit' />
                  </div>
              </fieldset>
          </form>
          <Link to={'/login'}>Ja tem uma conta?</Link>
      </div>
  )
}

export default Register