import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function BasicExample() {
     const initialState = { name: '', email: '', password: '' }
     const [eachEntry, setEachEntry] = useState(initialState)
     const { name, email, password } = eachEntry
     const handleOnChange = e => {
          setEachEntry({...eachEntry, [e.target.name]: e.target.value})
     }
     const handleSubmit = e => {
          e.preventDefault()
        }
     return (
          <div>
        <h1>Contact</h1><br></br>
        <Form>
          <Form.Group controlId='formBasicName'>           
          <Form.Label>Email</Form.Label>
          <Form.Control 
          onChange={handleChangeAuth}
          value={credentials.email}
          name='email'
          type='text'
          placeholder='Enter your email'
          />
          </Form.Group>

         <Form.Group controlId='formBasicEmail'>
         <Form.Label>Name</Form.Label>
         <Form.Control
         onChange={handleChangeAuth}
         value={credentials.name}
         name='name'
         type='text'
         placeholder='Enter your name'
         />
         </Form.Group>
        <Form.Group controlId='formBasicTextField'>
        <Form.Label>Password</Form.Label>
        <Form.Control
        onChange={handleChangeAuth}
        value={credentials.password}
        name='password'
        type='text'
        placeholder='Enter your Password'
        />
        </Form.Group>
        <Button variant='success' onSubmit={handleSubmit} type='submit'>Submit
        </Button>
      </Form>
   </div>
     );
}

export default BasicExample;