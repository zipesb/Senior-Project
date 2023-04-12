

import React, {useState} from 'react';

function FileUpload({file, setFile}) {
  return (
    <div className="App">
        <input id="file-input" class="custom-file-input" type="file" onChange={(file) => setFile(file.target.files[0])}/>
       {file !== null && <p>{file.name}</p>}
    </div>
  );
}

export default FileUpload;