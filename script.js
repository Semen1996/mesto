const popupEdit = document.querySelector('.popup');
const editButton = document.querySelector('.profile__editButton');
const closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_description');
let popupName = document.querySelector('.profile__name');
let popupJob = document.querySelector('.profile__description');
const userElements = document.querySelector('.elements');


// Открытие, закрытие попапа
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Открытие попапа изменение профиля
editButton.addEventListener('click', function() {
  togglePopup(popupEdit);
  nameInput.value = popupName.textContent;
  jobInput.value = popupJob.textContent;
}); 

// Закрытие попапа изменение профиля
closeButton.addEventListener('click', function() {
  togglePopup(popupEdit);
}); 

// Редактирование попапа изменение профиля
formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();                                          
  togglePopup(popupEdit);
  popupName.textContent = nameInput.value;
  popupJob.textContent = jobInput.value;
});




const initialCards = [
  {
    name: 'Карачаевск',
    link: 'images/Karachaevsk.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/Elbrus.png',
  },
  {
    name: 'Домбай',
    link: 'images/Dombay.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/Elbrus.png',
  },
  {
    name: 'Домбай',
    link: 'images/Dombay.jpg',
  },
  {
    name: 'Карачаево-Черкесия',
    link: 'images/Karachaevsk.jpg',
  }
]; 



// Функция для добавления карточки 
function addCard(link,title) {

  const elementTemplate = document.querySelector('#element').content;
  const userElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPicture = userElement.querySelector('.element__picture');
  const popupImage = document.querySelector('.popup_image');

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
  userElement.querySelector('.element__picture').addEventListener('click', function(evt){
    togglePopup(popupImage);
    document.querySelector('.popup__picture').src = link;
    document.querySelector('.popup__picture').alt = title;
    document.querySelector('.popup__figcaption').textContent = title;
  }); 

  // отображаем на странице
  userElements.prepend(userElement); 
}; 


// добавляем начальные карточки
for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].link,initialCards[i].name);
};



// Попап добавления элемента
const popupAdd = document.querySelector('.popup_add');
const addButton = document.querySelector('.profile__addButton');
const closeButtonAdd = document.querySelector('.popup__close_add');


addButton.addEventListener('click', function(){
  togglePopup(popupAdd);
}); 

closeButtonAdd.addEventListener('click',  function(){
  togglePopup(popupAdd);
}); 

// Находим форму в DOM
let formElementAdd = document.querySelector('.popup__container_add');
let titleInput = formElementAdd.querySelector('.popup__field_type_title');
let linkInput = formElementAdd.querySelector('.popup__field_type_link');


// Прикрепляем обработчик к форме:
formElementAdd.addEventListener('submit', function(evt) {
  evt.preventDefault(); 
  togglePopup(popupAdd);
  addCard(linkInput.value,titleInput.value);
});


// Закрываем попап с изображением
document.querySelector('.popup__close_image').addEventListener('click', function(){
  togglePopup(document.querySelector('.popup_image'));
});