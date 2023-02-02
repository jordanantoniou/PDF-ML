import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import { TuneIcon, ShapeIcon, GithubIcon } from './assets/icons';
import { Button } from './components/Button/Button';
import { Table } from './components/Table/Table';
import { Search } from './components/Search/Search';
import { FileList } from './components/FileList/FileList';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Classification, useFetchAll } from './hooks';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

function Dashboard() {
  const [files, setFiles] = useState<FileList>();
  const [existingClassifications, setExistingClassifications] = useState<Classification[]>([]);
  const [filteredClassifications, setFilteredClassifications] = useState<Classification[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
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

  const { isLoading, isSuccess } = useFetchAll({
    onSuccess: (data) => setExistingClassifications(data.classifications)
  });

  const handleSearchChange = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value || '';
    setSearchTerm(value);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredClassifications(existingClassifications);
    } else {
      const filtered = existingClassifications.filter(({ fileName }) =>
        fileName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClassifications(filtered);
    }
  }, [searchTerm]);

  return (
    <div className="App flex flex-col place-items-center gap-20 bg-base-1">
      <div className="w-full p-4">
        <a href="https://github.com/jordanantoniou/PDF-ML" target="_blank" rel="noreferrer">
          <GithubIcon />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-x-10">
        <Button title="Train" subtitle="Retrain model from scratch" icon={<TuneIcon />} />
        <Button
          title="Classify"
          subtitle="Upload a document to classify"
          icon={<ShapeIcon />}
          onClick={handleInputClick}
        />
        <input ref={inputRef} type="file" className="hidden" multiple onChange={handleFileChange} />
      </div>
      {files && <FileList files={files} />}
      {!isLoading && isSuccess ? (
        <div className="flex flex-col gap-3">
          <div className="grid w-full place-items-end">
            <Search onChange={handleSearchChange} value={searchTerm} />
          </div>
          <Table>
            <Table.Header titles={['Name', 'Class', 'Last classified']} />
            {(searchTerm ? filteredClassifications : existingClassifications).map(
              (classification) => (
                <Table.Row
                  key={classification['_id']}
                  values={[
                    classification.fileName,
                    classification.classification,
                    classification.lastUpdate
                  ]}
                />
              )
            )}
          </Table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
