const popupEdit = document.querySelector('.popup_edit');
const editButton = document.querySelector('.profile__editButton');
const formElementEdit = document.querySelector('.popup__container_edit');
const nameInput = formElementEdit.querySelector('.popup__field_type_name');
const jobInput = formElementEdit.querySelector('.popup__field_type_description');
const popupName = document.querySelector('.profile__name');
const popupJob = document.querySelector('.profile__description');

const popupAdd = document.querySelector('.popup_add');
const addButton = document.querySelector('.profile__addButton');

const userElements = document.querySelector('.elements');
const formElementAdd = document.querySelector('.popup__container_add');
const titleInput = formElementAdd.querySelector('.popup__field_type_title');
const linkInput = formElementAdd.querySelector('.popup__field_type_link');
const popupImage = document.querySelector('.popup_image');
const popupPicture = document.querySelector('.popup__picture');
const elementTemplate = document.querySelector('#element').content;
const closeImage = document.querySelector('.popup__close_image');

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// Вставляем новую карточку 
function insertCard(link,title) {

  const card = addCard(link,title);

  // отображаем на странице
  userElements.prepend(card); 
}


// Функция для добавления карточки 
function addCard(link,title) {

  const userElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPicture = userElement.querySelector('.element__picture');

  // наполняем содержимым
  elementPicture.src = link;
  elementPicture.alt = title;
  userElement.querySelector('.element__title').textContent = title;

  // Ставим лукасы
  userElement.querySelector('.element__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like_active');
  }); 

  // удаляем элемент
  userElement.querySelector('.element__dump').addEventListener('click', function(evt){
    evt.target.closest('.element').remove();
  });

  // Открываем попап с картинкой
  elementPicture.addEventListener('click', function(evt){
    openPopup(popupImage);
    popupPicture.src = link;
    popupPicture.alt = title;
    document.querySelector('.popup__figcaption').textContent = title;

    popupImage.addEventListener('click',closeButtonOverlay);
    document.addEventListener('keydown',closeButtonEsc);
  });

  return userElement;
}



// добавляем начальные карточки
for (let i = 0; i < initialCards.length; i++) {
  insertCard(initialCards[i].link,initialCards[i].name);
};




// 6 спринт

// Закрытие попапа с помощью кнопки Esc
function closeButtonEsc(evt) {

  if (evt.key==='Escape') {
  closePopup( document.querySelector('.popup_opened') );
  document.removeEventListener('keydown',closeButtonEsc);
 }

}

// Закрытие попапа с помощью нажатие на оверлей
function closeButtonOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
    evt.target.removeEventListener('click',closeButtonOverlay);
  }
}



nameInput.value = popupName.textContent;
jobInput.value = popupJob.textContent;
// Открытие попапа изменение профиля
editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = popupName.textContent;
  jobInput.value = popupJob.textContent;

  popupEdit.addEventListener('click',closeButtonOverlay);
  document.addEventListener('keydown',closeButtonEsc);

}); 


//  Открытие попапа добавления элемента
addButton.addEventListener('click', function(){
  openPopup(popupAdd);

  popupAdd.addEventListener('click',closeButtonOverlay);
  document.addEventListener('keydown',closeButtonEsc);
}); 



const popups = document.querySelectorAll('.popup');



function submitPopupEdit(evt) {
  evt.preventDefault();      

  if (!evt.submitter.classList.contains('popup__submitButton_inactive')) {
    
    closePopup(popupEdit);
    popupName.textContent = nameInput.value;
    popupJob.textContent = jobInput.value;
  }

}

function submitPopupAdd(evt) {
  evt.preventDefault(); 

  if (!evt.submitter.classList.contains('popup__submitButton_inactive')) {
  closePopup(popupAdd);
  insertCard(linkInput.value,titleInput.value);

  linkInput.value='';
  titleInput.value='';
  }

}

// Редактирование попапа изменение профиля
formElementEdit.addEventListener('submit', submitPopupEdit);

// Прикрепляем обработчик к форме
formElementAdd.addEventListener('submit', submitPopupAdd);



// Навешиваем попапам слушателей
popups.forEach(function(popup) {

  const closeButton = popup.querySelector('.popup__close');

  // Закрытие попапа крестиком
  closeButton.addEventListener('click', function() {
    closePopup(popup);
  });

});



// Подключаем валидацию форм
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submitButton',
  inactiveButtonClass: 'popup__submitButton_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__field_error'
}); 