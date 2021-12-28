import api from './api';

// -------------- STRATEEGIA

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


  // SPOTIFY

  export const fetchMyData = (spotify, set) => {
    (async () => {
        const me = await spotify.getMe();
        set({
            name: me.display_name,
            img: me.images[0].url,
            member: me.product
        })
    })().catch(e => console.log(e));
}

export const fetchSavedShows = (spotify, set) => {
    (async () => {
        const shows = await spotify.getMySavedShows();
        const show = shows.items[0].show;
        set({
            title: show.name,
            cover: show.images[0].url,
            id: show.id
        })
    })().catch(e => console.log(e));
}

export const fetchShow = (spotify, showId) => {
    (async () => {
        const show = await spotify.getShow(showId);
        console.log(show);
        console.log(show.name);
        console.log(show.publisher);
        console.log(show.total_episodes);
    })().catch(e => console.log(e));
}