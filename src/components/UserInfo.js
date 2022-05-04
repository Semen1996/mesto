export default class UserInfo {

  constructor(name,job) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
        name: this._name.textContent,
        job: this._job.textContent
    };
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(newData) {
    this._name.textContent = newData.name;
    this._job.textContent = newData.job;
  }
}