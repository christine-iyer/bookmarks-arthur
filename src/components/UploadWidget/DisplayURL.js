import { useState } from 'react';
import { Card } from 'react-bootstrap';


import UploadWidget from './UploadWidget';



export default function DisplayURL() {
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  /**
   * handleOnUpload
   */

  function handleOnUpload(error, result, widget) {
    if ( error ) {
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

      <Card className="container">
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

        {error && <p>{ error }</p>}

        {url && (

          <>
            <p><img src={ url } alt="Uploaded resource" /></p>
            <Card.Text>{ url }</Card.Text>
          </>
        )}
      </Card>

    </main>
  );
}

