import { littleHelper, getCookie, appendChildrens } from "./basedFunctions.js";

const cards = document.querySelectorAll('.course-card')
const popup = document.getElementById('popup');
const closePopup = document.querySelector('.closepopup');
const programming = document.getElementById('programming');
const marketing = document.getElementById('marketing');
const design = document.getElementById('design');
const courses = document.getElementById('all-courses')
const webprogramming = document.getElementById('web-programming');
const loginButton = document.getElementById('login-button');
const nameInput = document.getElementById('name');
const textInput = document.getElementById('text');
const makeReviewButton = document.getElementById('makeReview');
makeReviewButton.addEventListener('click', function() {
  const review = littleHelper('div', 'review'); // Создаем новый div для отзыва
  const nameDiv = littleHelper('div', 'name'); // Создаем div для имени
  const textDiv = littleHelper('div', 'text'); // Создаем div для текста отзыва
  const idDiv = littleHelper('div', 'id'); // Создаем div для ID отзыва
  const dateDiv = littleHelper('div', 'date'); // Создаем div для даты отзыва
  const name = nameInput.value.trim(); // Получаем name пользователя
  const text = textInput.value.trim(); // Получаем text отзыва
  const id = Date.now(); // Генерируем случайный ID отзыва
  const date = new Date().toLocaleDateString(); // Получаем текущую дату в формате "дд.мм.гггг"
  const saveReview = {
    "name": name,
    "text": text,
    "id": id,
    "date": date
  }
  if (!name || !text) { // Проверяем, что все поля заполнены
    alert('Пожалуйста, заполните все поля.'); // Если нет, показываем предупреждение
    return; // Прерываем выполнение функции
  }
  dateDiv.textContent = date; // Устанавливаем текст даты
  nameDiv.textContent = name; // Устанавливаем текст имени
  textDiv.textContent = text; // Устанавливаем текст отзыва
  idDiv.textContent = `id: ${id}`; // Устанавливаем ID отзыва
  appendChildrens(review, nameDiv, dateDiv, textDiv, idDiv); // Добавляем все элементы в новый div отзыва
  document.querySelector('.reviews-container').appendChild(review); // Добавляем новый отзыв в контейнер с отзывами
  alert(`Отзыв от ${name} (ID: ${id}) успешно отправлен!`); // Показываем сообщение об успешной отправке отзыва
  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || []; // Получаем существующие отзывы из localStorage
  existingReviews.push(saveReview); // Добавляем новый отзыв в массив существующих отзывов
  localStorage.setItem("reviews", JSON.stringify(existingReviews)); // Сохраняем обновленный массив отзывов в localStorage
});
const categories = {
  programming,
  design,
  marketing,
  courses,
  webprogramming,
}
const promoCodes = {
  'SUMMER20': 20,
  'WINTER15': 15,
  'SPRING10': 10
};
loginButton.addEventListener('click', function() { // Добавляет слушатель на кнопку входа
  if (getCookie('login' === 'true')){
    document.cookie = 'login=false; path=/; max-age=0'
    document.cookie = 'username=; path=/; max-age=0'; // Удаляет куки login
  }
  else{
    window.location.href = 'login.html'; // Перенаправляет на страницу входа
  } // Перенаправляет на страницу входа
});
if (getCookie('login') === 'true') { // если куки login = true он показывает имя пользователя
  const userName = document.createElement('span');
  userName.style.width = '100px';
  userName.style.textAlign = 'center';
  userName.style.color = 'blue';
  userName.style.fontWeight = 'bold';
  userName.style.marginRight = '10px';
  userName.style.fontSize = '16px';
  userName.textContent = getCookie('username');
  document.querySelector("nav").appendChild(userName); // добавляет юзер в навигацию
  loginButton.textContent = 'Выйти'; // меняет текст внутри кнопки на выйти
}

function checkPromoCode() {
  const code = document.getElementById('discount-input').value.trim().toUpperCase(); // Получаем значение промокода из поля ввода
  localStorage.setItem('userPromo', code); // Сохраняем промокод в localStorage
  if (promoCodes.hasOwnProperty(code)) {  // Проверярка на существование в promoCodes
    const discountValue = promoCodes[code]; // получение значения скидки
    cards.forEach(card => { // проходимся по всем карточкам 
        const originPrice = parseFloat(card.getAttribute('data-price')); // Получаем исходную цену из атрибута data-price превращая в число
        let discountedPrice = Math.round(originPrice * (1 - discountValue / 100)) // Рассчитываем цену со скидкой
        const price = card.querySelector('.price') // Находим элемент с ценой внутри карточки
        
        price.innerHTML = `<strong>Стоимость:</strong> ${discountedPrice.toLocaleString('ru-RU')} ₽`; // Обновляем цену в карточке
        
    })
  }else {
    alert('Неверный промокод. Пожалуйста, попробуйте еще раз.');
  }
}
popup.addEventListener('click', function() {
  document.getElementById('popup-container').style.display = 'flex';  // Показываем попап при клике на кнопку
});
closePopup.addEventListener('click', function() {
  document.getElementById('popup-container').style.display = 'none'; // Скрываем попап при клике на крестик
});
function filterCourses(category) {  // Функция для фильтрации карточек по категории
  cards.forEach(card => { // Получаем все карточки
  const cardCategory = card.dataset.category; // Получаем категорию карточки из атрибута data-category
    if (category === 'all' || cardCategory === category) { // Если категория карточки совпадает с выбранной категорией или выбрана категория "все"
      card.style.display = 'flex'; // Показываем карточку
      
    }
    else {
      card.style.display = 'none'; // Скрываем карточку
    }
  });
}
window.onload = function() { // При загрузке страницы проверяем наличие сохраненного промокода
  const savedCode = localStorage.getItem('userPromo'); // Получаем сохраненный промокод из localStorage
  const savedReview = localStorage.getItem('reviews'); // Получаем сохраненный отзыв из localStorage
  if (savedReview) { // Если отзыв существует в localStorage
    const reviews = JSON.parse(savedReview); // Парсим сохраненный отзыв
    const container = document.querySelector('.reviews-container'); // Получаем контейнер для отзывов
    reviews.forEach(review => {
      const reviewDiv = littleHelper('div', 'review'); // Создаем новый div для отзыва
      const nameDiv = littleHelper('div', 'name'); // Создаем div для имени
      const textDiv = littleHelper('div', 'text'); // Создаем div для текста отзыва
      const idDiv = littleHelper('div', 'id'); // Создаем div для ID отзыва
      const dateDiv = littleHelper('div', 'date'); // Создаем div для даты отзыва
      nameDiv.textContent = review.name; // Устанавливаем текст имени
      textDiv.textContent = review.text; // Устанавливаем текст отзыва
      idDiv.textContent = `id: ${review.id}`; // Устанавливаем ID отзыва
      dateDiv.textContent = review.date; // Устанавливаем дату отзыва
      appendChildrens(reviewDiv, nameDiv, dateDiv, textDiv, idDiv); // Добавляем все элементы в новый div отзыва
      container.appendChild(reviewDiv); // Добавляем новый отзыв в контейнер с отзывами
    })
  }
  if (savedCode && promoCodes.hasOwnProperty(savedCode)) { // Если промокод существует в promoCodes
    document.getElementById('discount-input').value = savedCode; // Заполняем поле ввода промокода
    checkPromoCode();
  }
}
document.getElementById('apply-discount-btn').addEventListener('click', checkPromoCode); // Добавляем слушатель на кнопку применения промокода
function handleFilter(categoryName) { 
  filterCourses(categoryName); // Фильтруем карточки по выбранной категории
  for (const key in categories){ // Проходимся по всем категориям
    categories[key].style.color = (key === categoryName) ? 'blue' : 'black'; // Меняем цвет текста выбранной категории на синий, остальные на черный
  }
  
}
for (const key in categories) { // Проходимся по всем категориям
    categories[key].addEventListener('click', function(){ // Добавляем слушатель на клик по категории
      handleFilter(key); // Добавляем слушатель на клик по категории
    });
}