import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ListGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Cloudinary } from "@cloudinary/url-gen";





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


    const cld = new Cloudinary({
        cloud: {
            cloud_name: "dqjhgnivi", //Your cloud name
            upload_preset: "crystal" //Create an unsigned upload preset and update this
        }
    });

   


    const [bookmark, setBookmark] = useState({
        title: '',
        category: '',
        image: '',
        body: ''
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
                image: '',
                category: '',
                body: ''
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
                                variant='success'
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
                                        style={{ width: '78rem' }}
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            signUp()
                                        }}>
                                        <Row>
                                            <h2>SignUp</h2>
                                            <Col>
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
                                            </Col>
                                            <Col>

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
                                            </Col>
                                            <Col>
                                                <Form.Group controlId='formBasicPassword'>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control onChange={handleChangeAuth}
                                                        value={credentials.password}
                                                        name='password'
                                                        type='text'
                                                        placeholder='Enter your Email' />
                                                </Form.Group>
                                            </Col>
                                        </Row>


                                        <Button variant='success' type='submit'>Submit
                                        </Button>
                                    </Form>
                                    :
                                    <Form
                                        style={{ width: '78rem' }}
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            login()
                                        }}>
                                        <h2>Login</h2>
                                        <Row>
                                            <Col>
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
                                            </Col>
                                            <Col>
                                                <Form.Group controlId='formBasicPassword'>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control onChange={handleChangeAuth}
                                                        value={credentials.password}
                                                        name='password'
                                                        type='text'
                                                        placeholder='Enter your Password' />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button variant='success' type='submit'>Submit
                                        </Button>
                                    </Form>
                            }
                        </>
                }
            </div>

            <h3>Cloudinary Upload Widget Example</h3>
      <CloudinaryUploadWidget />
      

            <Form
                style={{ width: '78rem' }}
                onSubmit={(e) => {
                    e.preventDefault()
                    createBookmark()
                }}>

                <h2>Create A Bookmark</h2>
 
                <Row>
                    <Col>
                        <Form.Group controlId='formBasicTitle'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                value={bookmarks.title}
                                name='title'
                                type='text'
                                placeholder='Title'
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Select Category</Form.Label>
                            <Form.Control
                                as='select'
                                type='text'
                                name='category'
                                option={bookmarks.category}
                                value={bookmarks.category}
                                onChange={handleChange}>
                                <option value="Work">Work</option>
                                <option value="Family">Family</option>
                                <option value="Code">Code</option>
                                <option value="Friends">Friends</option>
                                <option value="Misc">Misc</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='formBasicURL'>
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                value={bookmarks.image}
                                name='image'
                                type='text'
                                placeholder='Enter your Link' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Spill your guts</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={handleChange}
                            value={bookmarks.body}
                            name='body'
                            placeholder='' />
                    </Form.Group>
                </Row>

                <Button variant='success' type='submit'>Submit
                </Button>

            </Form>
            <ListGroup as="ol" numbered='true'>
                <h1>Bookmarks</h1>
                {bookmarks.length ? bookmarks.map(item => (
                    <ListGroup.Item key={item._id}>
                        <h4>{item.title} category: {item.category}</h4>
                        <img
                            id="uploadedimage"
                            src="">
                        </img> <a href={item.image} target="_blank"> {item.title}</a>
                        <p>{item.body}</p>
                    </ListGroup.Item >
                )) : <>No BookMarks Added</>}
            </ListGroup>



        </>
    )
}

