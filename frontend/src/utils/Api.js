class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    //  this._headers = options.headers;
    //  this._authorization = options.headers.authorization
  }

  // Приватный метод для проверки ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Получение информации о пользователе
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // authorization: this._authorization
      },
    });
  }

  // Редактирование информации о пользователе
  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: data.username,
        about: data.job,
      }),
    });
  }

  // Изменение аватара пользователя
  updateUserAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  // Получение списка карточек
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  // Добавление новой карточки
  addCard(cardInfo) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link,
      }),
    });
  }

  // Удаление карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  // return this._request(`${this._baseUrl}/cards/${cardId}`

  // Поставить лайк карточке
  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  // Убрать лайк с карточки
  unlikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  // 'https://mesto.nomoreparties.co/v1/cohort-69',
  // headers: {
  //   authorization: '1a325d4c-959b-42a2-8e6f-2cd070905828',
  //   'Content-Type': 'application/json'
  // }
});

export default api;

