

import React, {useState} from 'react';
import axios from 'axios';

function FileUpload({file, setFile}) {
  return (
    <div className="App">
        <input id="file-input" type="file" onChange={(file) => setFile(file.target.files[0])}/>
        <button>

        </button> 
    </div>
  );
}

export default FileUpload;