import api from './api';

export const authenticate = async (values) => {
    let functionReturn;
    await api("/users/v1/auth/signin", {
      method: "POST",
      auth: {
        username: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        functionReturn = response;
        localStorage.setItem("Access_Token", response.data.access_token);
        localStorage.setItem("Refresh_Token", response.data.refresh_token);
        // console.log(response.data.access_token, response.data.refresh_token);
      })
      .catch((err) => {
        throw Error(err.message);
      });
  
    return functionReturn;
  };

  export const fetchUserData = async (token) => {
    const { data } = await api("/users/v1/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };