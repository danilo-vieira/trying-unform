import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup'
import './App.css';

import Input from './components/Form/input';

function App() {
  //const [user, setUser] = useState({})
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('A valid email is required')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Min of 6 characters')
          .required('Required'),
        address: Yup.object().shape({
          city: Yup.string().min(3, 'Min of 3 characters')
        })
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(data)
      reset();
      formRef.current.setErrors({})
    } catch(err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  }

  // Simuling a API request
  useEffect(() => {
    console.log(formRef.current)
    setTimeout(() => {
      formRef.current.setData({
        name: 'Danilo Vieira',
        email: 'danilo_strvieira@hotmail.com',
      })
    }, 2000);
  }, [])

  return (
    <div className="App">
      <h1>Trying unform</h1>
      <p>You can learn more about this library seeing their doc by clicking <a target="blank" href="https://unform.dev/">here</a>.</p>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input placeholder="Name" name="name" />
        <Input placeholder="E-mail" type="email" name="email" />

        <Scope path="address">
          <Input placeholder="Street" name="street" />
          <Input placeholder="Neighborhood" name="neighborhood" />
          <Input placeholder="City" name="city" />
          <Input placeholder="State" name="state" />
          <Input placeholder="Number" name="number" />
        </Scope>
        <button type="submit">Send</button>
      </Form>
    </div>
  );
}

export default App;
