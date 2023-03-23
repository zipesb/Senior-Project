

import React, {useState} from 'react';
import axios from 'axios';

function FileUpload({files, setFiles, removeFile}) {

    function uploadHandler(event) {
        const file = event.target.files[0];
        //file.isUploading = true;
        //setFiles([...files, file]) 
        const formData = new FormData();
        formData.append ("file", file);

        axios.post('http://localhost:5000/upload', formData, {
            method: 'POST',
            headers: {
             'Content-Type': 'multipart/form-data'
            },
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err)
        })
    }

  return (
    <div className="App">
        <input class="custom-file-input" type="file" onChange={uploadHandler}/>
    </div>
  );
}

export default FileUpload;