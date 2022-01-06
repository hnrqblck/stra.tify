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

export const signUp = async (values) => {
    console.log(values);
    const response = await api('users/v1/user/signup', {
      method: "POST",
      data: {
        email: values.email,
        name: values.name,
        password: values.password,
        term_accepted: values.terms,
      },
    });
    console.log(response)
    return response
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

  export const createProject = async (token, values, id) => {
    const response = await api("/projects/v1/project", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        color: values.color,
        description: values.description,
        lab_owner_id: id,
        title: values.title,
      },
    });
    return response;
  };

  export const createMap = async (token, id) => {
    const response = await api(`/projects/v1/project/${id}/map`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: 'Podcast',
      },
    });
    return response;
  };
  
  export const createKit = async (token, values, refTitle, refUrl) => {
    const response = await api("/tools/v1/kit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        color: values.color,
        description: values.description,
        questions: [{
          question: 'O que achou deste episódio?',
        },
        {
          question: 'O que você gostaria de ouvir nos próximos encontros?',
        },
        {
          question: 'O que você gostaria de indicar?',
        },
      ],
        references: [{
          description: refTitle,
          url: refUrl,
        }],
        title: values.title,
      },
    });
    return response;
  };

  export const createDivPoint = async (token, id, col, row, toolId) => {
    const response = await api(`/projects/v1/map/${id}/divergence-point`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        position: {
          col: col,
          row: row,
        },
        tool_id: toolId,
      },
    });
    return response;
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

  export const fetchProjectById = async (token, id) => {
    const { data } = await api(`/projects/v1/project/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  };

  export const updateProjectInfo = async (token, values, id) => {
    const response = await api(`/projects/v1/project/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        color: values.color,
        title: values.title,
        description: values.description,
        visibility: 'PUBLIC',
      },
    });
    console.log(response);
    return response;
  };

  export const createProjectInvite = async (token, id) => {
    const response = await api(`/projects/v1/project/${id}/invite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        approve_all: true,
      }
    });
    console.log(response);
    return response;
  };

  export const updateProjectInvite = async (token, id) => {
    const response = await api(`/projects/v1/project/${id}/invite`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        approve_all: true,
      }
    });
    console.log(response);
    return response;
  };

  

  

  export const createConnectionLink = async (token, id) => {
    const response = await api(`/projects/v1/project/${id}/connection-link`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: 'oi',
        url: 'https://app.strateegia.digital/dashboard/public-link/AApejT'
      },
    });
    console.log(response);
    return response;
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