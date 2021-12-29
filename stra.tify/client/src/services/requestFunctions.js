import { set } from 'react-hook-form';
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

  export const fetchUserProjects = async (token) => {
    const { data } = await api("/projects/v1/project", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  export const createProject = async (token, values, id) => {
    let functionReturn;
    await api("/projects/v1/project", {
      method: "POST",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      auth: {
        color: 'PINK',
        description: values.description,
        lab_owner_id: id,
        title: values.title,
      },
    })
      .then((response) => {
        functionReturn = response;
        // console.log(response.data.access_token, response.data.refresh_token);
      })
      .catch((err) => {
        throw Error(err.message);
      });
  
    return functionReturn;
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

export const fetchShow = (spotify, showId, set) => {
    (async () => {
        const show = await spotify.getShow(showId);
        set({
          title: show.name,
          publisher: show.publisher,
          episodes: show.episodes.items,
          cover: show.images[0].url,
          description: show.description,
        })
    })().catch(e => console.log(e));
}

export const searchShow = (spotify, query, set) => {
  (async () => {
    const type = ['show']
    const result = await spotify.search(query, type);
    set(result.shows.items);
      // result.items.map
  })().catch(e => console.log(e));
}