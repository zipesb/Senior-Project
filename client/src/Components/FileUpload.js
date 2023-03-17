

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
            //file.isUploading = false;
            //setFiles([...files, file])
            console.log(res);
        })
        .catch((err) => {
            console.error(err)
            //removeFile(file.name)
        })
    }

  return (
    <div className="App">
        <input name="foo" type="file" onChange={uploadHandler}/>
        <button>

        </button> 
    </div>
  );
}

export default FileUpload;