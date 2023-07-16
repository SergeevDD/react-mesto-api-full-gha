import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
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
    handleRegister(formValue)

  }


  return (
    <section
      className={"register"}
    >
      <h2 className="register__title">Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className="register__form"
        noValidate
      >
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          className="register__input"
          required
          value={formValue.email}
        />
        <span
          className="register__error"
        >
          {validateMsg.email}
        </span>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Пароль"
          className="register__input"
          minLength="2"
          required
          value={formValue.password}
        />
        <span
          className="register__error"
        >
          {validateMsg.password}
        </span>
        <button
          disabled={!valid.email && !valid.password}
          type="submit"
          className={`register__btn ${!valid.email || !valid.password ? 'register__btn_disabled' : ""}`}
        >
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="register__link">{"Уже зарегистрированы? Войти"}</Link>
    </section>
  );
}

export default Register;
