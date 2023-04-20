import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

export default function Login ({
  login,
  credentials,
  handleChangeAuth
}) {
  return (
    <>
      <h2>Login</h2>
            <Form
                style={{ width: '38rem' }}
                onSubmit={(e) => {
                    e.preventDefault()
                    login()

                }}>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        onChange={handleChangeAuth}
                        value={credentials.email}
                        name='email'
                        type='text'
                        placeholder='Enter your Email'
                    />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChangeAuth}
                        value={credentials.password}
                        name='password'
                        type='text'
                        placeholder='Enter your Password' />
                </Form.Group>
                <Button variant='success' type='submit'>Submit
                </Button>

            </Form>
    </>
  )
}