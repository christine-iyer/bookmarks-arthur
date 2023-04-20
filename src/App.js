import { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ListGroup } from 'react-bootstrap';


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
            <h2>SignUp</h2>
            <Form style={{ width: '38rem' }}
                onSubmit={(e) => {
                    e.preventDefault()
                    signUp()
                }}>
                {/* <input type="text" value={credentials.email} name="email" onChange={handleChangeAuth} placeholder={'Email'}></input>
        <input type="text" value={credentials.name} name="name" onChange={handleChangeAuth} placeholder={'Name'}></input>
        <input type="password" value={credentials.password} name="password" onChange={handleChangeAuth} placeholder={'password'}></input>
        <input type="submit" value="Sign Up as New User"/> */}
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
            <h2>Create A Bookmark</h2>
            <Form onSubmit={(e) => {
                e.preventDefault()
                createBookmark()
            }}>
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
                    <Form.Control onChange={handleChange}
                        value={bookmarks.url}
                        name='url'
                        type='text'
                        placeholder='Enter your Link' />
                </Form.Group>
                <Button variant='success' type='submit'>Submit
                </Button>




                {/* <input type="text" value={bookmark.title} name="title" onChange={handleChange} placeholder={'Title'}></input>
                <input type="text" value={bookmark.url} name="url" onChange={handleChange} placeholder={'URL'}></input>
                <input type="submit" value="Create Bookmark" /> */}
            </Form>
            <ListGroup as="ol" numbered='true'>



                {bookmarks.length ? bookmarks.map(item => (
                    <ListGroup.Item key={item._id}>
                        <h4>{item.title}</h4>
                        <a href={item.url} target="_blank"> {item.url}</a>
                    </ListGroup.Item >
                )) : <>No BookMarks Added</>}

            </ListGroup>
            <Button variant="primary">Primary</Button>{' '}
        </>
    )
}