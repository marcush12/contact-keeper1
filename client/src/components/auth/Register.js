import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {register, error, clearErrors, isAuthenticated} = authContext;

  useEffect(() => {
    if(isAuthenticated) {
      props.history.push('/');
    }
    //if(error === 'User already exists'){
    if(error){  
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line 
  }, [error, isAuthenticated, props.history]);//dependency; useEffect runs when error changes

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Por favor, preencha todos os campos.', 'danger');
    } else if (password !== password2) {
      setAlert('As senhas não são iguais.', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <label className='form-container'>
      <h1>
        Conta: <span className='text-primary'>Registrar</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <label className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </label>
        <div className='form-group'>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirmar Senha</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          className='btn btn-primary btn-block'
          type='submit'
          value='Registrar'
        />
      </form>
    </label>
  );
};

export default Register;
