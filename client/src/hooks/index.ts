import { useQuery } from 'react-query';

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

export interface Classification {
  _id: string;
  hash: string;
  fileName: string;
  lastUpdate: string;
  classification: string;
}

const useClassifyUpload = (
  files: FileList
): {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: { classifications: Classification[] };
} => {
  const formData = new FormData();
  [...files].forEach((file) => formData.append('files', file));
  const { isLoading, isError, isSuccess, data } = useQuery('classifyUpload', () =>
    fetch(`${serverAddress}/storage/classifyUploads`, { method: 'post' }).then((res) => res.json())
  );
  return { isLoading, isError, isSuccess, data };
};

const useTrain = () => {
  const { isLoading, isError, data } = useQuery('train', () =>
    fetch(`${serverAddress}/nlp/train`).then((res) => res.json())
  );
  return { isLoading, isError, data };
};

const useFetchAll = ({
  onSuccess
}: {
  onSuccess: (data: { classifications: Classification[] }) => void;
}): {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { isLoading, isError, isSuccess } = useQuery(
    'classifications',
    () => fetch(`${serverAddress}/classification/findAll`).then((res) => res.json()),
    { onSuccess }
  );
  return { isLoading, isError, isSuccess };
};

export { useTrain, useFetchAll, useClassifyUpload };
