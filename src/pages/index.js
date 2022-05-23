import './index.css';

import {popupEditSelector, popupNameSelector, popupJobSelector, popupAddSelector, userElements, popupImageSelector, templateSelector,
    editButton, addButton, formElementEdit, nameInput, jobInput, formElementAdd, formObj, profileAvatarSelector, updateAvatarButton, popupUpdateAvatarSelector,
    popupConfirmationSelector, formElementAvatar} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidation from '../components/FormValidator.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';



///////////////////////////////////////////////////////////////
//                           API                            ///
///////////////////////////////////////////////////////////////

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '92685e82-98a8-415b-ab9c-1926b21a9a8f',
    'Content-Type': 'application/json'
  }
});

let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getUserInfo(),api.getInitialCards()])
  .then(([userData,initialCards]) => {

    userId = userData._id;

    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
    section.renderItems(initialCards);

  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////








///////////////////////////////////////////////////////////////
//            POPUP РЕДАКТИРОВАНИЯ ПРОФИЛЯ                  ///
///////////////////////////////////////////////////////////////


// Создаем экземпляр класса управления отображения информации о себе
const userInfo = new UserInfo(popupNameSelector, popupJobSelector, profileAvatarSelector);



// Создаем экземпляр класса для попапа редактирования профиля
const popupEdit = new PopupWithForm({popupSelector: popupEditSelector,
  handleFormSubmit: (dataForm) => {

    popupEdit.loading(true);


    api.editUserInfo(dataForm)
      .then(() => {
        userInfo.setUserInfo(dataForm);
      })
      .then(() => {
        popupEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEdit.loading(false);
      });
  }
});


// Устанавливаем слушателей для попапа редактирования профиля
popupEdit.setEventListeners();


// Открытие попапа изменение профиля
editButton.addEventListener('click', function() {
  popupEdit.open();

  const user = userInfo.getUserInfo();

  nameInput.value = user.name;
  jobInput.value = user.about;

  
  validationPopupEdit.resetForm();
});



// Создаем экземпляр класса для попапа редактирования аватарки
const popupupdateAvatar = new PopupWithForm({popupSelector: popupUpdateAvatarSelector,
  handleFormSubmit: (dataForm) => {
    
    popupupdateAvatar.loading(true);

    api.updateAvatar(dataForm)
    .then(()=>{
      userInfo.setAvatar(dataForm.avatar);
    })
    .then(()=>{
        popupupdateAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupupdateAvatar.loading(false);
    });
  
}
});


// Устанавливаем слушателей для попапа редактирования аватарки
popupupdateAvatar.setEventListeners();


// Открытие попапа редактирования аватарки
updateAvatarButton.addEventListener('click', function(){
  validationPopupAvatar.resetForm();
  popupupdateAvatar.open();
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////
//              POPUP ДОБАВЛЕНИЕ КАРТОЧКИ                   ///
///////////////////////////////////////////////////////////////


// Создаем экземпляр класса для попапа создания карточки
const popupAdd = new PopupWithForm({popupSelector: popupAddSelector,
  handleFormSubmit: (dataForm) => {

    popupAdd.loading(true);

    api.addCard(dataForm)
      .then((data)=>{
        section.addItem(createCard(data));
      })
      .then(()=>{
        popupAdd.close();
        
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAdd.loading(false);
      });

  }
});


// Устанавливаем слушателей для попапа добавления карточки
popupAdd.setEventListeners();


//  Открытие попапа добавления элемента
addButton.addEventListener('click', function(){
  validationPopupAdd.resetForm();
  popupAdd.open();
});



// Создаем экземпляр класса, открывающий попап с картинкой
const popupImage = new PopupWithImage(popupImageSelector);

//Устанавливаем слушателей для попапа с картинкой
popupImage.setEventListeners();



// Создаем экземпляр класса, открывающий попап с потверждением удаления
const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);

// Устанавливаем слушателей для попапа с потверждением удаления
popupConfirmation.setEventListeners();



 // Создаем экземпляр класса, отвечающий за отрисовку элементов на странице
const section = new Section({
  renderer: (item)=> {
    const cardElement = createCard(item);
    section.addItem(cardElement);
  }
},
userElements);

// При нажатии на картинку
function handleCardClick(title, link) {
  popupImage.open(title, link);
}


// Создаем новую карточку
function createCard(dataCard) {
  const card = new Card({
    dataCard: dataCard, 
    userId: userId, 
    cardSelector: templateSelector, 
    handleCardClick: handleCardClick,
    handleDumpClick: () => {
      popupConfirmation.open();

      popupConfirmation.deleteCard(() => {
        api.deleteCard(dataCard._id)
          .then(() => {
            card.deleteCard();
          })
          .then(() => {
            popupConfirmation.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },

    setLike: () => {
      api.addLikeCard(dataCard._id)
        .then((data) =>{
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },

    removeLike: () => {
      api.deleteLikeCard(dataCard._id)
        .then((data) =>{
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });

  return card.generateCard();
}


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////
//                    ВАЛИДАЦИЯ ФОРМ                        ///
///////////////////////////////////////////////////////////////


// Создаем экземпляры классов валидации форм
const validationPopupAdd = new FormValidation(formObj, formElementAdd);
const validationPopupEdit = new FormValidation(formObj, formElementEdit);
const validationPopupAvatar = new FormValidation(formObj, formElementAvatar);

// Подключаем валидацию форм
validationPopupAdd.enableValidation();
validationPopupEdit.enableValidation();
validationPopupAvatar.enableValidation();

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
