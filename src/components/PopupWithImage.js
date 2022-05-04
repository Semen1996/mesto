import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = this._popup.querySelector('.popup__picture');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  }

  open(title,link) {
    this._popupPicture.src = link;
    this._popupPicture.alt = title;
    this._popupFigcaption.textContent = title;

    super.open();
  }

}