import axios, { AxiosResponse } from 'axios';

const loginYandex = async (authorizationCode: string): Promise<AxiosResponse> => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return await axios
    .post(
      'https://oauth.yandex.com/token',
      {
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: 'f5483a52894d4ef7a309bc46f65c6bec',
        client_secret: import.meta.env.VITE_YANDEX_CLIENT_SECRET,
      },
      config,
    )
    .then((response) => response.data)
    .catch((error) => error);
};

const logoutYandex = async (token: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  await axios
    .post(
      'https://oauth.yandex.com/',
      {
        access_token: token,
        },
      config,
    )
    .then((response) => response.data)
    .catch((error) => error);
}

export { loginYandex, logoutYandex };
