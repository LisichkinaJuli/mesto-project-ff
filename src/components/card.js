import { setLike, deleteLike } from '../components/api';

const cardTemplate = document.querySelector('#card-template');

export const createCard = function (item, handleLikeClick, handleDeleteCard, handleClickOpenImage, userId) {
    const cardItem = getCardTemplate();
    const cartImg = cardItem.querySelector('.card__image');
    const cardName = cardItem.querySelector('.card__title');
    const cardLikeButton = cardItem.querySelector('.card__like-button');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const cardLikeCounter = cardItem.querySelector('.card__like-quantity');
    const cardId = item._id;
    const likesArr = item.likes;

    // Создание карточки
    cartImg.src = item.link;
    cartImg.alt = item.name;
    cardName.textContent = item.name;
    cardLikeCounter.textContent = item.likes.length;

    //Прослушивание событий на клик по лайку, на картинку, удаление карточки
    cardLikeButton.addEventListener('click', (evt) => handleLikeClick(evt, item._id, cardLikeCounter));
    cartImg.addEventListener('click', handleClickOpenImage);
    cardDeleteButton.addEventListener('click', (evt) => handleDeleteCard(evt, cardId));

    //Оставляем кнопку удаления только карточкам пользователя
    if (item.owner._id !== userId) {
        cardDeleteButton.style.display = "none";
    };
    //Проверяем лайки пользователя
    likesArr.forEach(el => {
        if (el._id === userId) {
            cardLikeButton.classList.add('card__like-button_is-active');
        }
    });

    return cardItem;
};

export const getCardTemplate = () => {
    return cardTemplate.content.cloneNode(true).querySelector('.places__item');
};

export const handleLikeClick = (evt, id, cardLikeCounter) => {
    evt.target.classList.toggle('card__like-button_is-active');
    if (evt.target.classList.contains('card__like-button_is-active')) {
        setLike(id)
        .then((item) => {
            cardLikeCounter.textContent = item.likes.length;
        })
        .catch(err => console.log(err));
    }
    else {
        deleteLike(id)
        .then((item) => {
            cardLikeCounter.textContent = item.likes.length;
        })
        .catch(err => console.log(err));
    }
};