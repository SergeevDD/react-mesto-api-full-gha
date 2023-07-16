import React, { useState } from 'react';

function Login({ handleLogin }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const [validateMsg, setValidateMsg] = useState('');
  const [valid, setValid] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
    setValidateMsg({
      ...validateMsg,
      [name]: e.target.validationMessage
    });
    setValid({
      ...valid,
      [name]: e.target.validity.valid
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue);
  }

  return (
    <section
      className={`login`}
    >
      <h2 className="login__title">Вход</h2>
      <form
        onSubmit={handleSubmit}
        className="login__form"
        noValidate
      >
        <input
          onChange={handleChange}
          name='email'
          type="email"
          placeholder="Email"
          className="login__input"
          required
          minLength="2"
          maxLength="40"
          value={formValue.email}
        />
        <span
          className="login__error"
        >
          {validateMsg.email}
        </span>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Пароль"
          className="login__input"
          required minLength="2"
          maxLength="200"
          value={formValue.password}
        />
        <span
          className="login__error"
        >
          {validateMsg.password}
        </span>
        <button
          disabled={!valid.email && !valid.password}
          type="submit"
          className={`login__btn ${!valid.email || !valid.password ? 'login__btn_disabled' : ""}`}
        >
          Войти
        </button>
      </form>

    </section>
  );
}

export default Login;
