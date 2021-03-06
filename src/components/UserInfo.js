export default class UserInfo {

  constructor(name,about,avatar) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
      //avatar: this._avatar.style.backgroundImage
    };
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(newData) {
    this._name.textContent = newData.name;
    this._about.textContent = newData.about;
    //this._avatar.style.backgroundImage = `url(${newData.avatar})`;
  }

  setAvatar(newAvatarURL) {
    this._avatar.style.backgroundImage = `url(${newAvatarURL})`;
  }
}