import { ChangeEvent, useRef, useState } from 'react';
import './App.css';
import { TuneIcon, ShapeIcon, GithubIcon } from './assets/icons';
import { Button } from './components/Button/Button';
import { Table } from './components/Table/Table';
import { Search } from './components/Search/Search';
import { FileList } from './components/FileList/FileList';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const [files, setFiles] = useState<FileList>();
  // type ClassificationData = { fileName: string; classification: string };
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('here');
    if (!e.target.files) {
      return;
    }
    setFiles(e.target.files);
  };

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  // const [trainingStatus, setTrainingStatus] = useState<string>('');

  // const [classifyStatus, setClassifyStatus] = useState<string | Array<ClassificationData>>('');
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App flex flex-col place-items-center gap-20 bg-base-1">
        <div className="w-full p-4">
          <GithubIcon />
        </div>
        <div className="grid grid-cols-2 gap-x-10">
          <Button
            title="Train"
            subtitle="Retrain model from scratch"
            onClick={() => {}}
            icon={<TuneIcon />}
          />
          <Button
            title="Classify"
            subtitle="Upload a document to classify"
            icon={<ShapeIcon />}
            onClick={handleInputClick}
          />
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </div>
        {files && <FileList files={files} />}
        <div className="flex flex-col gap-3">
          <div className="grid w-full place-items-end">
            <Search />
          </div>
          <Table>
            <Table.Header titles={['Name', 'Class', 'Last classified']} />
            <Table.Row values={['sample-data-file.pdf', 'Confirmation statement', '22-03-2023']} />
            <Table.Row values={['sample-data-file.pdf', 'Confirmation statement', '22-03-2023']} />
          </Table>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
