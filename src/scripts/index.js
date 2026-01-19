import '../pages/index.css';
import initialCards from "../scripts/cards";
import { createCard, handleLikeClick, handleDeleteCard } from '../components/card';
import { openPopup, closePopup } from '../components/modal';

// Переменные для карточек
const cardList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupOpenImage = document.querySelector('.popup_type_image'); 
// Диалоговые окна (popup)
const popupContainer = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
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
// Переменные формы создания нового места
const formElementPlace = document.forms['new-place'];
const placeName = formElementPlace.elements['place-name'];
const placeLink = formElementPlace.elements['link'];

// КАРТОЧКА
// Вывод карточки на страницы с помощью темплейт
initialCards.forEach((item) => {
    const card = createCard(item, handleLikeClick, handleDeleteCard, handleClickOpenImage);
    cardList.appendChild(card);
});

// ПРОФИЛЬ
// Функция открытия диалогового окна профиля
buttonProfileEdit.addEventListener('click',() => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
    openPopup(popupEdit);
});
//Редактирования профиля
formElementProfile.addEventListener('submit', handleFormProfileSubmit);
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closePopup(popupEdit);
};

// НОВОЕ МЕСТО
// Функция открытия диалогового окна создания нового места
buttonNewCard.addEventListener('click',() => {
    openPopup(popupNewCard);
});
formElementPlace.addEventListener('submit', handleFormsPlaceSubmit);
function handleFormsPlaceSubmit(evt){
    evt.preventDefault();
    const item = {
        name: placeName.value,
        link: placeLink.value
    };
    const card = createCard(item, handleLikeClick, handleDeleteCard, handleClickOpenImage);
    cardList.prepend(card);
    formElementPlace.reset();
    closePopup(popupNewCard);
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
    item.addEventListener('click', ()=>{
        const popup = item.closest('.popup')
        closePopup(popup);
    });
});
// Плавное появление окна
popupContainer.forEach((item) =>{
    item.classList.add('popup_is-animated');
});