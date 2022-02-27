// Открытие, закрытие попапа
let popup = document.querySelector('.popup');
let EditButton = document.querySelector('.ProfileInfo__EditButton');
let closeButton = document.querySelector('.popup__close');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

EditButton.addEventListener('click', togglePopup); 
closeButton.addEventListener('click', togglePopup); 


// Ставим лукасы
let like = document.querySelector('.Element__like');

function toggleLike() {
  like.classList.toggle('Element__like_active');
}

like.addEventListener('click', toggleLike); 



// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__Field_type_Name');
let jobInput = formElement.querySelector('.popup__Field_type_Description');

let popupName = document.querySelector('.ProfileInfo__Name');
let popupJob = document.querySelector('.ProfileInfo__Description');

nameInput.value = popupName.textContent;
jobInput.value = popupJob.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  
  popupName.textContent = nameInput.value;
  popupJob.textContent = jobInput.value;

  popup.classList.toggle('popup_opened');

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 

