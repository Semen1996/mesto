import { openPopup } from './script.js';

export default class Card {

    constructor(link, title, cardSelector) {
      this._link = link;
      this._title = title;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const userElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return userElement;
    }
    
    generateCard() {
      // Запишем разметку в приватное поле _element. 
      this._element = this._getTemplate();
      this._elementPicture = this._element.querySelector('.element__picture');
  
      //Подключим слушателей
      this._setEventListeners();
  
      // наполняем содержимым
      this._elementPicture.src = this._link;
      this._elementPicture.alt = this._title;
      this._element.querySelector('.element__title').textContent = this._title;
    
      return this._element;
    }
  
    //Навешиваем слушателей
    _setEventListeners() {
  
      // Ставим лукасы
      this._element.querySelector('.element__like').addEventListener('click',function(evt){
        evt.target.classList.toggle('element__like_active');
      }); 
  
      // удаляем элемент
      this._element.querySelector('.element__dump').addEventListener('click', function(evt){
        evt.target.closest('.element').remove();
      });
  
      // Открываем попап
      this._elementPicture.addEventListener('click', () => {
        const popupImage = document.querySelector('.popup_image');
        const popupPicture = document.querySelector('.popup__picture');
        openPopup(popupImage);
        popupPicture.src = this._link;
        popupPicture.alt = this._title;
        document.querySelector('.popup__figcaption').textContent = this._title;
      });
    }
  }