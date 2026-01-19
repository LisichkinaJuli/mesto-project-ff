// Функция закрытия диалогового окна на Escape
export const closeByEsc = (e) => {
    if(e.key === "Escape") {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup); 
    }
}
// Функция закрытия диалогового окна на Overlay
export const closeByOverlayClick = (e) => {
    if (e.target.classList.contains('popup_is-opened')) {
        closePopup(e.target); 
    }
}
// Функция открытия диалогового окна
export const openPopup = function(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByOverlayClick);
}
// Функция закрытия диалогового окна
export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeByOverlayClick);
    document.removeEventListener('keydown', closeByEsc);
}