const cards = document.querySelectorAll('.course-card')
const popup = document.getElementById('popup');
const closePopup = document.querySelector('.closepopup');
const programming = document.getElementById('programming');
const marketing = document.getElementById('marketing');
const design = document.getElementById('design');
const courses = document.getElementById('all-courses')
const webprogramming = document.getElementById('web-programming');
const loginButton = document.getElementById('login-button');
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
  window.location.href = 'login.html'; // Перенаправляет на страницу входа
});
function getCookie(name) { 
  const value = `; ${document.cookie}`; // получает куки и ставит перед ним разделитель если есть ключ = значение
  const parts = value.split(`; ${name}=`); // разделяет стркоу на части по разделителю
  if (parts.length === 2) {
    return parts.pop().split(';').shift() // возвращает значение куки, удаляя все лишнее после равно
  };
  return null;
}
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
    loginButton.addEventListener('click', function() { // Добавляет слушателя который login = false а значит удаляет куки
      document.cookie = 'login=false; path=/; max-age=0'; // удаляет куки login
      window.location.href = 'main.html'; // Перенаправляет на главную страницу
    });
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