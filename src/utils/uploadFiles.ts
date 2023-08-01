import axios from 'axios';

export type UploadProgress = {
  [key: string]: number;
};

export const uploadFile = async (
  url: string,
  file: File,
  setUploadProgress: (value: React.SetStateAction<UploadProgress>) => void,
): Promise<void> => {
  try {
    await axios
      .put(url, file, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress((prev) => ({ ...prev, [file.name]: percentCompleted }));
          }
        },
      })
      .then((response) => {
        console.log(response);
      });
  } catch (error) {
    console.error(error);
  }
};
