/* 1. Работа модальных окон

1.1 Открытие и закрытие модального окна */
// выбор кнопок редактирования профиля и добавления карточки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// выбор попапов и кнопок закрытия внутри них
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const closeEditProfileButton = editProfilePopup.querySelector('.popup__close-icon');
const closeAddCardButton = addCardPopup.querySelector('.popup__close-icon');

// (6.) поиск контейнера для карточек в DOM
const cardContainer = document.querySelector('.gallery');

// (6.) поиск формы создания новой карточки в DOM
const formAddCardElement = document.querySelector('[name="add card form"]');

// (6.) массив дефолтных карточек
const initialCards = [
  {
    name: "Уральские горы",
    link: "https://www.miroworld.ru/wp-content/uploads/2018/08/Uralskie-gory.jpg"
  },
  {
    name: "Балтийское море",
    link: "https://faktoved.ru/wp-content/uploads/fakti-o-baltiyskom-more.jpg"
  },
  {
    name: "Геленджик",
    link: "https://gge.ru/upload/iblock/1dd/gelendzhik2.jpg"
  },
  {
    name: "Домбай",
    link: "https://c1.staticflickr.com/3/2857/34131350951_ae3b3c56b9_o.jpg"
  },
  {
    name: "Гора Эльбрус",
    link: "https://cdn2.tu-tu.ru/image/pagetree_node_data/1/60969a99bfee0f30a4f2894acab45073/"
  },
  {
    name: "Карачаевск",
    link: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/43/51/c6/shoana-church.jpg?w=1100&h=-1&s=1"
  }
];

// добавление дефолтных карточек при загрузке страницы
window.onload = function () {
  initialCards.forEach(item => {
    addCard(item, cardContainer);
  })
};

// функция откртытия попапа общая
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// обработчик событий для кнопки открытия попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
});

// обработчик событий для кнопки открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

// функция закрытия попапа общая
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// обработчик событий для кнопки закрытия попапа редактирования профиля
closeEditProfileButton.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

// обработчик событий для кнопки закрытия попапа добавления карточки
closeAddCardButton.addEventListener('click', () => {
  closePopup(addCardPopup);
});


// 1.2 Поля формы. Отображение значений по умолчанию в полях формы редактирования профиля

// выбор имени пользователя и статуса на странице
const username = document.querySelector('.profile__username');
const userInfo = document.querySelector('.profile__user-info');

// выбор текстовых полей формы редактирования профиля, где д/отображ-ся имя и статус со страницы
const inputUsername = editProfilePopup.querySelector('.popup__item_type_username');
const inputUserInfo = editProfilePopup.querySelector('.popup__item_type_user-info');

// извлечение контента со страницы и заполнение им полей формы
function openFormDefault() {
  inputUsername.value = username.textContent;
  inputUserInfo.value = userInfo.textContent;
}

editProfileButton.addEventListener('click', openFormDefault);


// 1.3 Редактирование имени и информации о себе

// Находим форму в DOM
const formProfileElement = editProfilePopup.querySelector('[name="profile edit form"]');

// Функция обработчика «отправки» формы, хотя пока она никуда отправляться не будет
function submitFormHandler(evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();

  // вставка новых значений с помощью textContent на страницу из полей формы, значения которых извлекаются с помощью value
  username.textContent = inputUsername.value;
  userInfo.textContent = inputUserInfo.value;
}

// Прикрепление обработчика к форме, который будет следить за событием “submit” - «отправка»
formProfileElement.addEventListener('submit', submitFormHandler);

// обработчик нажатия на кнопку 'submit', который будет вызывать функцию закрытия попапа
formProfileElement.addEventListener('submit', () => {
  closePopup(editProfilePopup);
});

// 4. Добавление полноценной карточки через форму / при загрузке страницы

// 4.1 Создание карточки
function createCard(card) {
  // найти template в DOM
  const cardTemplate = document.querySelector('#card-template').content;
  // поиск узла (ноды) "элемент 'карточка'" для клонирования всего содежиомого
  const cardElement = cardTemplate.querySelector('.gallery-item').cloneNode(true);
  // найти поля, куда надо добавить содержимое из массива
  cardElement.querySelector('.gallery-item__signature').textContent = card.name;
  cardElement.querySelector('.gallery-item__photo').src = card.link;
  cardElement.querySelector('.gallery-item__photo').alt = card.name;

  // 5. Лайк карточки
  // выбор кнопок лайка на странице
  const cardLike = cardElement.querySelector('.gallery-item__like');
  // слушатель с функцией event для выбора конкретного лайка, по которому кликнул пользователь
  cardLike.addEventListener('click', function (evt) {
    // выбор кликнутого лайка через event target
    const targetLike = evt.target;
    // изменение класса для кикнутого лайка (установленного и снятого)
    targetLike.classList.toggle('gallery-item__like_active');
  });

  // 6. Удаление карточки
  // выбор кнопок удаления карточек
  const deleteCard = cardElement.querySelector('.gallery-item__delete-card');
  // слушатель на кнопку удаления, по которой кликнул полз-ль
  deleteCard.addEventListener('click', function () {
    // кнопка кликнута - выбор ближайшего родлителя кликнутой кнопки
    const targetToDelete = deleteCard.closest('.gallery-item');
    // удаление карточки (ближайшего родителя кликнутой кнопки), по иконке удаления которой кликнул пользователь
    targetToDelete.remove();
  })

  // 7. Открытие и закрытие фото по клику
  // выбор кнопки-картинки, которая откроет саму картинку в попапе
  const openPhoto = cardElement.querySelector('.gallery-item__photo');
  // выбор попапа и кнопки закрытия внутри него
  const openPhotoPopup = document.querySelector('.popup_type_open-photo');
  const closePhoto = openPhotoPopup.querySelector('.popup__close-icon_close-photo');
  // обработчик событий для кнопки открытия попапа с фотографией
  openPhoto.addEventListener('click', () => {
    // открытие попапа
    openPopup(openPhotoPopup);
    // выбор контейнера попапа
    const image = openPhotoPopup.querySelector('.popup__opened-image');
    // заполнение контейнера нужным содержимым (изображение + подпись) в зависимости от кликнутой картинки
    image.src = card.link;
    image.alt = card.name;
    const signature = openPhotoPopup.querySelector('.popup__image-signature');
    signature.textContent = card.name;
  });
  // обработчик событий для кнопки закрытия попапа с фотографией
  closePhoto.addEventListener('click', () => {
    closePopup(openPhotoPopup);
  });

  // вернуть готовую карточку со всеми внутренними примочками (лайк, удаление, открытие фото)
  return cardElement;
}

// функция для добавления карточки в DOM
function addCard(card, cardContainer) {
  const cardElement = createCard(card);
  cardContainer.prepend(cardElement);
}

// обработчик события submit для формы добавления новой карточки
function addFormHandler(evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();

  // поиск полей добавления названия места и ссылки на фотографию
  const placeName = formAddCardElement.querySelector('.popup__item_type_place');
  const placePic = formAddCardElement.querySelector('.popup__item_type_link');

  // вставка новых значений с помощью аналогичного объявленному выше массива на страницу из полей формы, значения которых извлекаются с помощью value
  const card = {
    name: placeName.value,
    link: placePic.value
  };

  // вызов функции добавления карточки на страницу, внутри которой есть функция для создания самой разметки карточки. Передаваемые агрументы:
  //      1 - массив карточек - либо статичный для отрисовки дефолтных, либо массив, создаваемый при передачи данных из фориы добавления карточки;
  //      2 - контейнер в разметке, куда надо вставлять карточки, полученные из массивов
  addCard(card, cardContainer);
}

// Прикрепление обработчика к форме, который будет следить за событием “submit” - «отправка»
formAddCardElement.addEventListener('submit', addFormHandler);

// обработчик нажатия на кнопку 'submit', который будет вызывать функцию закрытия попапа
formAddCardElement.addEventListener('submit', () => {
  closePopup(addCardPopup);
});
