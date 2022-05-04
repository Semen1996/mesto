export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escapeClose = this._handleEscClose.bind(this);
  }

  // Закрытие попапа с помощью кнопки Esc
  _handleEscClose(evt) {
    if (evt.key==='Escape') {
      this.close();
    }
  }
  
  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close');

    // Закрытие попапа крестиком
    closeButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escapeClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escapeClose);
  }
  
}