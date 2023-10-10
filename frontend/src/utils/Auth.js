export const BASE_URL = "https://api.immweasel.nomoredomainsrocks.ru";
// "http://localhost:3000";
// "https://auth.nomoreparties.co"

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`);
  }
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize  = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => checkResponse(res))
    .then((data) => {
      if (data.token) {
        //Сохраним токен в localStorage пользователя
        localStorage.setItem("token", data.token);
        return data;
      } 
    })
  }; 
  
  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => checkResponse(res))
      .then((data) => data);
  };
