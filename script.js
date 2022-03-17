const popupEdit = document.querySelector('.popup');
const editButton = document.querySelector('.profile__editButton');
const closeButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__field_type_name');
const jobInput = formElement.querySelector('.popup__field_type_description');
const popupName = document.querySelector('.profile__name');
const popupJob = document.querySelector('.profile__description');
const userElements = document.querySelector('.elements');
const popupAdd = document.querySelector('.popup_add');
const addButton = document.querySelector('.profile__addButton');
const closeButtonAdd = document.querySelector('.popup__close_add');
const formElementAdd = document.querySelector('.popup__container_add');
const titleInput = formElementAdd.querySelector('.popup__field_type_title');
const linkInput = formElementAdd.querySelector('.popup__field_type_link');
const popupImage = document.querySelector('.popup_image');
const popupPicture = document.querySelector('.popup__picture');
const elementTemplate = document.querySelector('#element').content;


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
  const userElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPicture = userElement.querySelector('.element__picture');

  addCard(link,title,userElement,elementPicture);

  // отображаем на странице
  userElements.prepend(userElement); 
}

// Функция для добавления карточки 
function addCard(link,title,userElement,elementPicture) {

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
  });
}

// Открытие попапа изменение профиля
editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = popupName.textContent;
  jobInput.value = popupJob.textContent;
}); 

// Закрытие попапа изменение профиля
closeButton.addEventListener('click', function() {
  closePopup(popupEdit);
});

// Редактирование попапа изменение профиля
formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();                                          
  closePopup(popupEdit);
  popupName.textContent = nameInput.value;
  popupJob.textContent = jobInput.value;
});

// добавляем начальные карточки
for (let i = 0; i < initialCards.length; i++) {
  insertCard(initialCards[i].link,initialCards[i].name);
};

// Попап добавления элемента
addButton.addEventListener('click', function(){
  openPopup(popupAdd);
}); 

closeButtonAdd.addEventListener('click',  function(){
  closePopup(popupAdd);
}); 

// Прикрепляем обработчик к форме:
formElementAdd.addEventListener('submit', function(evt) {
  evt.preventDefault(); 
  closePopup(popupAdd);
  insertCard(linkInput.value,titleInput.value);
});

// Закрываем попап с изображением
document.querySelector('.popup__close_image').addEventListener('click', function(){
  closePopup(popupImage);
});