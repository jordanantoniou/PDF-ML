import { useEffect, useState } from 'react';
import { useClassify, useUpload } from '../../hooks';
import { LoadingBar, Placeholder } from '../Loading/Loading';
import { animate } from '@motionone/dom';

const FileList = ({ files }: { files: FileList }) => {
  let classifications = [...files].map((file: File) => ({
    name: file.name,
    classification: undefined
  }));
  const [loading, setLoading] = useState<boolean>(true);
  const {
    isLoading: uploading,
    isError: uploadError,
    data: uploadResponseStatus
  } = useUpload(files);

  const { isLoading, isError, isSuccess, data } = useClassify(uploadResponseStatus === 200);

  if (data) {
    classifications = data.map(
      ({ fileName, classification }: { fileName: string; classification: string }) => ({
        name: fileName,
        classification
      })
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <LoadingBar complete={!isLoading || isSuccess} />

      {classifications.map((classificationMap, index) => (
        <File
          id={`classified-file-${index}`}
          key={classificationMap.name}
          {...classificationMap}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

interface FileProps {
  id: string;
  name: string;
  classification?: string;
  isLoading: boolean;
}

const File = ({ id, name, classification, isLoading, ...rest }: FileProps) => {
  useEffect(() => {
    animate(
      `#${id}`,
      { y: [50, 0], scale: [0.5, 1], opacity: [0, 1] },
      { duration: 0.7, easing: 'ease-in-out' }
    );
  }, []);
  return (
    <div
      id={id}
      className="classified-file grid grid-cols-class-table items-center rounded-md bg-base-5 px-4"
      {...rest}>
      <div>{name}</div>
      <div className="p-3 font-mono">{classification || <Placeholder />}</div>
      <div className={`${isLoading ? 'cursor-wait' : 'cursor-pointer'} p-3`}>👍</div>
      <div className={`${isLoading ? 'cursor-wait' : 'cursor-pointer'} p-3`}>👎</div>
    </div>
  );
};

export { FileList };