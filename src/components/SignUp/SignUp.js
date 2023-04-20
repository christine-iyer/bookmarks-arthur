import Form from 'react-bootstrap/Form';
import styles from './SignUp.module.scss'

export default function SignUp({
     credentials,
     signUp,
     handleChangeAuth
}) {
     return (
          <>
               <h2>SignUp</h2>
               <Form style={{ width: '38rem' }}
                    onSubmit={(e) => {
                         e.preventDefault()
                         signUp()
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
                    <Form.Group controlId='formBasicName'>
                         <Form.Label>Name</Form.Label>
                         <Form.Control
                              onChange={handleChangeAuth}
                              value={credentials.name}
                              name='name'
                              type='text'
                              placeholder='Enter your Name'
                         />
                    </Form.Group>
                    <Form.Group controlId='formBasicPassword'>
                         <Form.Label>Password</Form.Label>
                         <Form.Control onChange={handleChangeAuth}
                              value={credentials.password}
                              name='password'
                              type='text'
                              placeholder='Enter your Email' />
                    </Form.Group>

               </Form>
          </>
     )
}