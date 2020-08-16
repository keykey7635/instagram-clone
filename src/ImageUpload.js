import React, {useState} from 'react';
import { Button } from "@material-ui/core";
import { storage, db} from "./firebase";
import firebase from "firebase";
import './ImageUpload.css';

function ImageUpload({username}) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    // For the progress visual
    uploadTask.on(
      // upload task takes time, so while the wait, we can render below.
      "state_changed",
      (snapshot) => {
        // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
        alert(error.message);
      },
      () =>{
        // complete function ...
        // download the pictures uploaded just now.
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            // holding the url as url.
            // post image inside db!
            db.collection("posts").add({
              // To sort posts by uploaded date and time, not by rundom.
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      {/* We wanna have... */}
      {/* Caption input... */}
      {/* File picker... */}
      {/* Post Button... */}
      <progress className="imageupload__progress" value={progress} max="100" />
      <input type="text" placeholder='Enter a caption...' value={caption} onChange={event => setCaption(event.target.value)} />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}

export default ImageUpload
