import axios from 'axios';
import { useQuery } from 'react-query';

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const useClassify = (enabled: boolean) => {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ['classify', enabled],
    () => axios.get(`${serverAddress}/nlp/classify`).then((res) => res.data),
    { enabled }
  );
  return { isLoading, isError, error, isSuccess, data };
};

const useClassifyUpload = (files: FileList) => {
  const formData = new FormData();
  [...files].forEach((file) => formData.append('files', file));
  const { isLoading, isError, isSuccess, data } = useQuery('classifyUpload', () =>
    fetch(`${serverAddress}/nlp/classifyUpload`, { method: 'post' }).then((res) => res.json())
  );
  return { isLoading, isError, isSuccess, data };
};

const useTrain = () => {
  const { isLoading, isError, data } = useQuery('train', () =>
    fetch(`${serverAddress}/nlp/train`).then((res) => res.json())
  );
  return { isLoading, isError, data };
};

const useUpload = (files: FileList) => {
  const formData = new FormData();
  [...files].forEach((file) => formData.append('files', file));
  const { isLoading, isError, data } = useQuery('upload', () =>
    axios.post(`${serverAddress}/storage/upload`, formData).then((res) => res.status)
  );

  return { isLoading, isError, data };
};

export { useClassify, useTrain, useUpload, useClassifyUpload };
