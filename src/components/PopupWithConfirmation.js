import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__container');
  }

  // принимает функцию на удаление карточки
  deleteCard(removeCard) {
    this._handleYes = removeCard;
  }

  // удаление карточки по нажатию на submit
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('click', (event) => {
      this._handleYes();
      this.close();
    });
  }
  
}