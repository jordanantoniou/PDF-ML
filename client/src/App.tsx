import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';

function App() {
  type FileEventTarget = { files: FileList };

  const handleFileUpload = async (eventTarget: FileEventTarget) => {
    let formData = new FormData();
    const file = eventTarget?.files?.[0] || null;
    console.log(file);
    formData.append('file', file);
    if (file) {
      await axios.post('http://127.0.0.1:3000/', formData);
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {/* <form action="/profile" method="post" encType="multipart/form-data"> */}
      <input
        type="file"
        multiple
        onChange={({ target: { files } }) => {
          if (files) {
            handleFileUpload({ files });
          }
        }}
      />
      {/* </form> */}
    </div>
  );
}

export default App;
