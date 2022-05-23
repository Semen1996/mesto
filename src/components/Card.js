export default class Card {

    constructor({dataCard, userId, cardSelector, handleCardClick, handleDumpClick, setLike, removeLike}) {
      this._link = dataCard.link;
      this._title = dataCard.name;
      this._likes = dataCard.likes;
      this._numOfLikes = this._likes.length;
      this._cardId = dataCard._id;
      this._cardOwnerId = dataCard.owner._id;
      this._userId = userId;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDumpClick = handleDumpClick;
      this._setLike = setLike;
      this._removeLike = removeLike;
    }
  
    _getTemplate() {
      const userElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return userElement;
    }
    
    generateCard() {
      // Запишем разметку в приватное поле _element. 
      this._element = this._getTemplate();
      this._elementPicture = this._element.querySelector('.element__picture');
      this._likeButton = this._element.querySelector('.element__like');

      //Подключим слушателей
      this._setEventListeners();
  
      // наполняем содержимым
      this._elementPicture.src = this._link;
      this._elementPicture.alt = this._title;
      this._element.querySelector('.element__title').textContent = this._title;

      this._element.querySelector('.element__number-of-likes').textContent = this._numOfLikes;
      //this.handleLikeCard(this._cardId);
      if (this._likes.some(like => like._id ===  this._userId)){
        this._likeButton.classList.toggle('element__like_active');
      }

      return this._element;
    }

    // Ставим лукасы  
    handleLikeCard(dataId) {
      this._likeButton.classList.toggle('element__like_active');
      this._element.querySelector('.element__number-of-likes').textContent = dataId.likes.length;
    }

    // удаляем элемент
    deleteCard() {
      this._element.remove();
    }

    // нажимаем на мусорку
    _handleDump() {
      this._handleDumpClick();
    }

    // устанавливаем картинку с мусоркой
    _installDump() {
      if( this._cardOwnerId === this._userId) {
        let button = document.createElement('button');
        button.className = "element__dump";
        button.type = "button";
        button.ariaLabel = "Удалить";
        button.addEventListener('click', () => {
          this._handleDump();
        });

        this._elementPicture.after(button);
      }
    }

    //Навешиваем слушателей
    _setEventListeners() {
      
      this._likeButton.addEventListener('click', () => {
        if (this._likeButton.classList.contains('element__like_active')) {
          this._removeLike(this._cardId);
        } else {
          this._setLike(this._cardId);
        }
      });
      
      this._elementPicture.addEventListener('click', () => {this._handleCardClick(this._title, this._link);});

      //Устанавливаем помойки 
      this._installDump();

    }
  }