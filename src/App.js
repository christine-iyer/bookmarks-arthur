import { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ListGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';



export default function App() {
    const handleChangeAuth = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const handleChange = (event) => {
        setBookmark({ ...bookmark, [event.target.name]: event.target.value })
    }
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: ''
    })
    const [bookmark, setBookmark] = useState({
        title: '',
        url: ''
    })
    const [bookmarks, setBookmarks] = useState([])

    const [showSignUp, setShowSignUp] = useState(true)
    const [user, setUser] = useState(null)

    const [token, setToken] = useState('')
    const login = async () => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem('token', JSON.stringify(tokenResponse))
        } catch (error) {
            console.error(error)
        }
    }
    const signUp = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...credentials })
            })
            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem('token', JSON.stringify(tokenResponse))
        } catch (error) {
            console.error(error)
        }
    }
    const createBookmark = async () => {
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ ...bookmark })
            })
            const data = await response.json()
            setBookmarks([data, ...bookmarks])
        } catch (error) {
            console.error(error)
        } finally {
            setBookmark({
                title: '',
                url: ''
            })
        }
    }
    const listBookmarksByUser = async () => {
        try {
            const response = await fetch('/api/users/bookmarks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            const data = await response.json()
            setBookmarks(data)
        } catch (error) {
            console.error(error)
        }
    }
    const deletedBookmark = async (id) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            const bookmarksCopy = [...bookmarks]
            const index = bookmarksCopy.findIndex(bookmark => id === bookmark.id)
            bookmarksCopy.splice(index, 1)
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }
    const updateBookmark = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })
            const data = await response.json()
            const bookmarksCopy = [...bookmarks]
            const index = bookmarksCopy.findIndex(bookmark => id === bookmark.id)
            bookmarksCopy[index] = { ...bookmarksCopy[index], ...updatedData }
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const tokenData = localStorage.getItem('token')
        if (tokenData && tokenData !== 'null' && tokenData !== 'undefined') {
            listBookmarksByUser()
        }
    }, [])

    useEffect(() => {
        const tokenData = localStorage.getItem('token')
        if (tokenData && tokenData !== 'null' && tokenData !== 'undefined') {
            setToken(JSON.parse(tokenData))
        }
    }, [])
    return (
        <>

           <div>
           {
    user && user.name
      ? <h1 className='styles.h1'>Welcome {user.name.toUpperCase()}</h1>
      : <>
        <Button
          className=' '
          onClick={() => {
            setShowSignUp(!showSignUp)
          }}
        >
          {showSignUp ? 'Sign Up  Below or Click Here To Login' : 'Welcome Back, Login or Click Here To Sign Up'}
        </Button>
        {
            showSignUp
              ? 
<Form 
            style={{ width: '38rem' }}
                onSubmit={(e) => {
                    e.preventDefault()
                    signUp()
                }}>
                    <h2>SignUp</h2>
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
                <Button variant='success' type='submit'>Submit
                </Button>
            </Form>

              : 
<Form
                style={{ width: '38rem'}}
                onSubmit={(e) => {
                    e.preventDefault()
                    login()

                }}>
                    <h2>Login</h2>
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

        }
      </>
}
          
            </div> 
            
            
            <Form
                style={{ width: '38rem' }}
                onSubmit={(e) => {
                    e.preventDefault()
                    createBookmark()
                }}>
                    <h2>Create A Bookmark</h2>
                <Form.Group controlId='formBasicTitle'>
                    <Form.Label>Bookmark Title</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        value={bookmarks.title}
                        name='title'
                        type='text'
                        placeholder='Title'
                    />
                </Form.Group>
                <Form.Group controlId='formBasicURL'>
                    <Form.Label>Bookmark Link</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        value={bookmarks.url}
                        name='url'
                        type='text'
                        placeholder='Enter your Link' />
                </Form.Group>
                <Button variant='success' type='submit'>Submit
                </Button>
            </Form>
            <ListGroup as="ol" numbered='true'>
                <h1>Bookmarks</h1>
                {bookmarks.length ? bookmarks.map(item => (
                    <ListGroup.Item key={item._id}>
                        <h4>{item.title}</h4>
                        <a href={item.url} target="_blank"> {item.title}</a>
                    </ListGroup.Item >
                )) : <>No BookMarks Added</>}
            </ListGroup>


        </>
    )
}

