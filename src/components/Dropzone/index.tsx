import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import styles from './Dropzone.module.css';
import Loading from '../Loading';
import { getLinkToUpload } from '../../utils/getLinkToUpload';

type TProps = {
  token: string;
};

type UploadProgress = {
  [key: string]: number;
};

const COUNT_MAX_UPLOAD_FILES = 100;

const Dropzone: React.FC<TProps> = ({ token }) => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [uploading, setUploading] = useState<boolean>(false);
  const [isDragRejected, setIsDragRejected] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > COUNT_MAX_UPLOAD_FILES) {
        toast.error('Too many files');
        setIsDragRejected(true);
        return;
      }

      if (Object.entries(uploadProgress).length > 0) {
        setUploadProgress({});
      }

      const uploadPromises = acceptedFiles.map(async (file) =>
        getLinkToUpload(file, token, setUploading, setUploadProgress),
      );

      Promise.all(uploadPromises)
        .then(() => {
          setUploading(false);
          toast.success('All files uploaded');
          console.log('All files uploaded');
        })
        .catch((error) => console.error(error));
    },
    [token, uploadProgress],
  );

  const onDropRejected = () => {
    setIsDragRejected(true);
  };

  const onDropAccepted = () => {
    setIsDragRejected(false);
  };

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({
    onDrop,
    onDropRejected,
    onDropAccepted,
    maxFiles: COUNT_MAX_UPLOAD_FILES,
  });

  const style = useMemo(
    () => ({
      className:
        styles.dropzone +
        ' ' +
        (isFocused ? styles.active : '') +
        ' ' +
        (isDragAccept ? styles.accept : '') +
        ' ' +
        (isDragRejected ? styles.reject : ''),
    }),
    [isDragAccept, isDragRejected, isFocused],
  );

  const renderContentDragZone = () => {
    if (uploading) {
      return <Loading />;
    }

    return (
      <>
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em className={styles.description}>
          ({COUNT_MAX_UPLOAD_FILES} files are the maximum number of files you can drop here)
        </em>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div {...getRootProps(style)}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <>{renderContentDragZone()}</>}
      </div>

      {uploadProgress && Object.entries(uploadProgress).length > 0 && (
        <ul className={styles.progressList}>
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <li className={styles.progressItem} key={fileName}>
              <span>{fileName}:</span> <span>{progress}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropzone;
