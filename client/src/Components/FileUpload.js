

import React, {useState} from 'react';
import axios from 'axios';

function FileUpload() {

    function uploadHandler(event) {
        const file = event.target.files[0];

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
        <input name="foo" type="file" onChange={uploadHandler}/>
        <button>

        </button> 
    </div>
  );
}

export default FileUpload;