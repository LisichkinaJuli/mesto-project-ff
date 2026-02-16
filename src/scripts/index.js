import '../pages/index.css';
import { createCard, handleLikeClick } from '../components/card';
import { openPopup, closePopup } from '../components/modal';
import { clearValidation, enableValidation } from '../components/validation';
import { getUserInfo, getCards, updateUserInfo, updateAvatar, addNewCard, deleteCard } from '../components/api';

// Переменные для карточек
const cardList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupOpenImage = document.querySelector('.popup_type_image');
// Диалоговые окна (popup)
const popupContainer = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
// Кнопки
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');
// Кнопки зыкрытия диалоговых окон
const buttonClose = document.querySelectorAll('.popup__close');
// Переменные формы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const formElementProfile = document.forms['edit-profile'];
const nameInput = formElementProfile.elements.name;
const jobInput = formElementProfile.elements.description;
// Переменные формы аватар
const profileUserImage = document.querySelector('.profile__image');
const formElementAvatar = document.forms['new-avatar'];
const avatarLink = formElementAvatar.elements['avatarLink'];
// Переменные формы создания нового места
const formElementPlace = document.forms['new-place'];
const placeName = formElementPlace.elements['place-name'];
const placeLink = formElementPlace.elements['link'];
// Переменные формы удаления нового места
const formDelete = document.forms['delete-card'];


// ПРОФИЛЬ
// Функция открытия диалогового окна профиля
buttonProfileEdit.addEventListener('click', () => {
    clearValidation(formElementProfile, validationConfig);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
    openPopup(popupEdit);
});
//Редактирования профиля
formElementProfile.addEventListener('submit', handleFormProfileSubmit);
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    const saveButton = popupEdit.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';
    const name = nameInput.value;
    const about = jobInput.value;
    updateUserInfo(name, about)
    .then(() => {
        profileTitle.textContent = name;
        profileDesc.textContent = about;
        formElementProfile.reset();
        clearValidation(formElementProfile, validationConfig);
        closePopup(popupEdit);
    })
    .catch(err => console.log(err))
    .finally(() => {
        saveButton.textContent = 'Сохранить'; // Вернется в исходное состояние всегда
    });
};

// НОВОЕ МЕСТО
// Функция открытия диалогового окна создания нового места
buttonNewCard.addEventListener('click', () => {
    openPopup(popupNewCard);
    formElementPlace.reset();
    clearValidation(formElementPlace, validationConfig);
});
formElementPlace.addEventListener('submit', handleFormsPlaceSubmit);
function handleFormsPlaceSubmit(evt) {
    evt.preventDefault();
    const saveButton = popupNewCard.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';
    const item = {
        name: placeName.value,
        link: placeLink.value
    };
    addNewCard(item)
    .then((item) => {
        const card = createCard(item, handleLikeClick, handleDeleteCard, handleClickOpenImage, item.owner['_id']);
        cardList.prepend(card);
        formElementPlace.reset();
        clearValidation(formElementPlace, validationConfig);
        closePopup(popupNewCard);
    })
    .catch(err => console.log(err))
    .finally(() => {
        saveButton.textContent = 'Сохранить'; // Вернется в исходное состояние всегда
    });
};
// Функция удаления карточки нового места
function handleDeleteCard(evt, cardId) {
    openPopup(popupDeleteCard);
    const card = evt.target.closest('.places__item');
    formDelete.addEventListener('submit', (evt) => handleFormsDeleteCardSubmit(evt, card, cardId));
}
function handleFormsDeleteCardSubmit(evt, card, cardId) {
    evt.preventDefault();
    const saveButton = popupDeleteCard.querySelector('.popup__button');
    saveButton.textContent = 'Удаление ...'
    deleteCard(cardId)
    .then(() => {
        closePopup(popupDeleteCard);
        card.remove();
    })
    .catch(err => console.log(err))
    .finally(() => {
        saveButton.textContent = 'Да'  // Вернется в исходное состояние всегда
    });
}


// ИЗМЕНЕНИЕ АВАТАРА
// Функция открытия диалогового окна изменения аватара
profileUserImage.addEventListener('click', () => {
    openPopup(popupNewAvatar);
    formElementAvatar.reset();
    clearValidation(formElementAvatar, validationConfig);
});
formElementAvatar.addEventListener('submit', handleFormsAvatarSubmit);
function handleFormsAvatarSubmit(evt) {
    evt.preventDefault();
    const saveButton = popupNewAvatar.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';
    updateAvatar(avatarLink.value)
    .then(() => {
        profileUserImage.setAttribute('style', `background-image: url('${avatarLink.value}')`);
        formElementAvatar.reset();
        clearValidation(formElementAvatar, validationConfig);
        closePopup(popupNewAvatar);
    })
    .catch(err => console.log(err))
    .finally(() => {
        saveButton.textContent = 'Сохранить'; // Вернется в исходное состояние всегда
    });
};

// POPUP
//Открытие popup картинки 
function handleClickOpenImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(popupOpenImage);
}
//Прослушивание события закрытия окна при нажатии на крестик 
buttonClose.forEach((item) => {
    item.addEventListener('click', () => {
        const popup = item.closest('.popup')
        closePopup(popup);
    });
});
// Плавное появление окна
popupContainer.forEach((item) => {
    item.classList.add('popup_is-animated');
});

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
enableValidation(validationConfig);

//Добавление информации в профиль
const setUserInfo = (user) => {
    profileUserImage.setAttribute('style', `background-image: url('${user.avatar}')`);
    profileTitle.textContent = user.name;
    profileDesc.textContent = user.about;
};

// Рендер карточек
const renderCards = (cards, userId) => {
    cards.forEach((item) => {
        const card = createCard(item, handleLikeClick, handleDeleteCard, handleClickOpenImage, userId);
        cardList.appendChild(card);
    });
};

// Получение информации о пользователе и карточках
Promise.all([getUserInfo(), getCards()])
.then(([user, cardsInfo]) => {
    setUserInfo(user);
    renderCards(cardsInfo, user._id);
});