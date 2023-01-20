import { useEffect, useState } from 'react';
import { ThumbsDown, ThumbsUp } from '../../assets/icons';
import { useClassify, useUpload } from '../../hooks';

const FileList = ({ files }: { files: FileList }) => {
  // TODO Send request to classify files

  const [loading, setLoading] = useState<boolean>(true);
  const classifications = [...files].map((file: File) => ({
    name: file.name,
    classification: undefined
  }));
  const {
    isLoading: uploading,
    isError: uploadError,
    data: uploadResponseStatus
  } = useUpload(files);

  const { isLoading, isError, data } = useClassify(uploadResponseStatus === 200);

  return (
    <div>
      {/* <LoadingBar /> */}
      <table>
        <tbody>
          {classifications.map(({ name, classification }) => (
            <tr key={name}>
              <td className="p-3">{name}</td>
              <td className="p-3 font-mono">{classification}</td>
              <td className="cursor-pointer p-3">{!loading && <ThumbsUp />}</td>
              <td className="cursor-pointer p-3">{!loading && <ThumbsDown />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { FileList };
