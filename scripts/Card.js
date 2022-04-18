export default class Card {

    constructor(link, title, cardSelector,handleCardClick) {
      this._link = link;
      this._title = title;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
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

    // Ставим лукасы
    _toggleLike() {
      this._element.querySelector('.element__like').addEventListener('click',function(evt){
        evt.target.classList.toggle('element__like_active');
      });
    }
  
    // удаляем элемент
    _deleteCard() {
      this._element.querySelector('.element__dump').addEventListener('click', function(evt){
        evt.target.closest('.element').remove();
      });
    }

    // Открываем попап
    _handleImageClick() {
      this._elementPicture.addEventListener('click', () => {
        
        this._handleCardClick(this._title, this._link);

      });
    }

    //Навешиваем слушателей
    _setEventListeners() {
      
      this._toggleLike();
  
      this._deleteCard();
      
      this._handleImageClick();
    }
  }