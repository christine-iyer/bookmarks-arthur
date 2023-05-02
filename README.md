# Bookmarks from [my youtube](https://youtube.com/@bigpoppacode)
This is not going well

# Run commands in this order to get started
## npm i
## npm run build
## npm run server
## npm run client

### Note: server and client have to run at the same time

```js
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
```
## 5/1/2023

Code for cloudinary that prints the newly generated URL.

```JS
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import DisplayURL from './components/UploadWidget/DisplayURL';
import UploadWidget from './components/UploadWidget/UploadWidget';



export default function App() {
    const [url, updateUrl] = useState();
    const [error, updateError] = useState();


    /**
     * handleOnUpload
     */

    function handleOnUpload(error, result, widget) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true
            });
            return;
        }
        updateUrl(result?.info?.secure_url);
    }

    return (
        <main className="main">
            <div className="container">
                <h1 className="title">
                    React &amp; Cloudinary Upload Widget
                </h1>
            </div>

            <div className="container">
                <h2>Unsigned with Upload Preset</h2>
                <UploadWidget onUpload={handleOnUpload}>
                    {({ open }) => {
                        function handleOnClick(e) {
                            e.preventDefault();
                            open();
                        }
                        return (
                            <button onClick={handleOnClick}>
                                Upload an Image
                            </button>
                        )
                    }}
                </UploadWidget>

                {error && <p>{error}</p>}

                {url && (
                    <Card key={url._id} className={styles.card} style={{ width: '18rem' }}
                    >
                        <Card.Img variant='top'

                            id="uploadedimage"
                            src={url} ></Card.Img>
                        <Card.Text>{url}</Card.Text>
                    </Card>
                )}
            </div>


        </main>
    );
}



```
