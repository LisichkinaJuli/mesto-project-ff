export const createCard = function(item, handleLikeClick, handleDeleteCard, handleClickOpenImage) {
    const cardTemplate = document.querySelector('#card-template');
    const cardItem = cardTemplate.content.cloneNode(true).querySelector('.places__item');
    const cartImg = cardItem.querySelector('.card__image');
    const cardName = cardItem.querySelector('.card__title');
    const cardLikeButton = cardItem.querySelector('.card__like-button');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');

    // Создание карточки
    cartImg.src = item.link;
    cartImg.alt = item.name;
    cardName.textContent = item.name;
    
    //Прослушивание событий на клик по лайку, на картинку, удаление карточки
    cardLikeButton.addEventListener('click', handleLikeClick);
    cartImg.addEventListener('click', handleClickOpenImage);   
    cardDeleteButton.addEventListener('click', handleDeleteCard);
    return cardItem;
};
export const handleLikeClick = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
};
export const handleDeleteCard = (evt) => {
   let card = evt.target.closest('.places__item');
   card.remove();
};