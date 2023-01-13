import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';
const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

function App() {
  type FileEventTarget = { files: FileList };
  type ClassificationData = { fileName: string; classification: string };

  const [trainingStatus, setTrainingStatus] = useState<String>('');

  const [classifyStatus, setClassifyStatus] = useState<
    String | Array<ClassificationData>
  >('');

  const handleFileUpload = async (eventTarget: FileEventTarget) => {
    let formData = new FormData();
    const file = eventTarget?.files?.[0] || null;
    formData.append('file', file);
    if (file) {
      await axios.post(`${serverAddress}/storage/upload`, formData);
    }
  };

  const trainClassifier = async () => {
    setTrainingStatus('Loading...');
    const response = await axios.get(`${serverAddress}/nlp/train`);
    setTrainingStatus(`Response: ${response.data.message}`);
  };

  const classify = async () => {
    setClassifyStatus('Loading...');
    const response = await axios.get(`${serverAddress}/nlp/classify`);
    setClassifyStatus(response.data);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 place-content-center	">
      <h1 className="col-start-2 text-3xl font-bold underline pb-5">
        Class-ify
      </h1>

      <input
        className="row-start-2 px-6 text-grey-500 place-content-center
           py-2 min-h-[2.2rem] max-h-[2.2rem] max-w-[8rem]
          rounded-full border-0
          text-sm font-medium
          bg-blue-50 text-blue-700
          hover:cursor-pointer hover:bg-amber-50
          hover:text-amber-700"
        type="button"
        onClick={trainClassifier}
        value="Train"
      />
      {trainingStatus && (
        <p className="row-start-3 col-span-1 max-w-[15rem]">{trainingStatus}</p>
      )}

      <label className="row-start-2">
        <input
          type="file"
          className=" text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
          onChange={({ target: { files } }) => {
            if (files) {
              handleFileUpload({ files });
            }
          }}
        />
      </label>

      <input
        className="row-start-2 text-grey-500
          mr-5 py-2 min-h-[2.2rem] max-h-[2.2rem] max-w-[8rem]
          rounded-full border-0
          text-sm font-medium
          bg-blue-50 text-blue-700
          hover:cursor-pointer hover:bg-amber-50
          hover:text-amber-700"
        type="button"
        onClick={classify}
        value="Classify"
      />

      {Array.isArray(classifyStatus) && (
        <div className="flex flex-col row-start-3 col-span-2">
          {classifyStatus.map(({ fileName, classification }) => {
            return (
              <div className="row-start-3 col-span-2 flex justify-center pb-2">
                <div className="pr-5">
                  <label className="font-bold">Filename:</label> {fileName}
                </div>
                <div className="">
                  <label className="font-bold">Classification:</label>
                  {classification}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
