import axios from 'axios';
import { uploadFile } from './uploadFiles';
import type { UploadProgress } from './uploadFiles';

type UploadResponse = {
  href: string;
};

export const getLinkToUpload = async (
  file: File,
  token: string,
  setUploading: (value: boolean) => void,
  setUploadProgress: (value: React.SetStateAction<UploadProgress>) => void,
): Promise<void> => {
  try {
    const response = await axios.get<UploadResponse>(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2F%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B8%2F${file.name}&overwrite=true`,
      {
        headers: {
          Authorization: 'OAuth ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (response.data.href) {
      setUploading(true);
      await uploadFile(response.data.href, file, setUploadProgress);
    }
  } catch (error) {
    console.error(error);
  }
};
