// Открытие, закрытие попапа
let popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__editButton');
const closeButton = document.querySelector('.popup__close');

const like = document.querySelector('.element__like');

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_description');

let popupName = document.querySelector('.profile__name');
let popupJob = document.querySelector('.profile__description');


function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function handleOpenProfilePopup() {
  togglePopup();
  nameInput.value = popupName.textContent;
  jobInput.value = popupJob.textContent;
}

editButton.addEventListener('click', handleOpenProfilePopup); 
closeButton.addEventListener('click', togglePopup); 


// Ставим лукасы
function toggleLike() {
  like.classList.toggle('element__like_active');
}

like.addEventListener('click', toggleLike); 


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  togglePopup();
  
  popupName.textContent = nameInput.value;
  popupJob.textContent = jobInput.value;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);