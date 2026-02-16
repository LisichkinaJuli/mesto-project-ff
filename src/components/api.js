const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/higher-front-back-dev',
  headers: {
    authorization: 'aefe705f-31d4-4959-ab69-00f081a303b8',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (response) => {
  if (response.ok) return response.json();
  else return response.json()
    .then(data => Promise.reject(data.error ?? response.statusText));
}

// Получение данных пользователя
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(handleResponse)
}

// Получение данных карточек
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(handleResponse)
}

// Обновление аватара
export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  });
}

//Сохранение данных о пользователя
export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
};

//Добавление новой карточки
export const addNewCard = (item) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: item.name,
      link: item.link
    })
  })
    .then(handleResponse)
};

//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse)
};

//Поставить like карточки
export const setLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(handleResponse)
}
//Удалить like карточки
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse)
}