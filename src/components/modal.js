// Функция открытия диалогового окна
export const openPopup = function(popup){
   popup.classList.add('popup_is-opened'); 
   document.addEventListener('keydown', (e) =>{
        if(e.key == "Escape") {
            closePopup(popup); 
        }   
    });
    document.addEventListener('click', (e) =>{
        if (e.target.classList.contains('popup_is-opened')) {
            closePopup(popup); 
        }
   });
}
// Функция закрытия диалогового окна
export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
}