const promoCodes = {
  'SUMMER20': 20,
  'WINTER15': 15,
  'SPRING10': 10
};
const cards = document.querySelectorAll('.course-card')
const popup = document.getElementById('popup');
const closePopup = document.querySelector('.closepopup');
const categories = {
  programming: document.getElementById('programming'),
  design: document.getElementById('design'),
  marketing: document.getElementById('marketing'),
  courses: document.getElementById('all-courses'),
}
function checkPromoCode() {
  const code = document.getElementById('discount-input').value.trim().toUpperCase();
  localStorage.setItem('userPromo', code);
  if (promoCodes.hasOwnProperty(code)) {
    const discountValue = promoCodes[code];
    cards.forEach(card => {
        const originPrice = parseFloat(card.getAttribute('data-price'));
        let discountedPrice = Math.round(originPrice * (1 - discountValue / 100))
        const price = card.querySelector('.price')
        
        price.innerHTML = `<strong>Стоимость:</strong> ${discountedPrice.toLocaleString('ru-RU')} ₽`;
        
    })
  }else {
    alert('Неверный промокод. Пожалуйста, попробуйте еще раз.');
  }
}
popup.addEventListener('click', function() {
  document.getElementById('popup-container').style.display = 'flex';
});
closePopup.addEventListener('click', function() {
  document.getElementById('popup-container').style.display = 'none';
});
function filterCourses(category) {
  cards.forEach(card => {
  const cardCategory = card.dataset.category;
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
      
    }
    else {
      card.style.display = 'none';
    }
  });
}
window.onload = function() {
  const savedCode = localStorage.getItem('userPromo');
  if (savedCode && promoCodes.hasOwnProperty(savedCode)) {
    document.getElementById('discount-input').value = savedCode;
    checkPromoCode();
  }
}
document.getElementById('apply-discount-btn').addEventListener('click', checkPromoCode);
function handleFilter(categoryName) {
  filterCourses(categoryName === 'courses' ? 'all' : categoryName);
  for (const key in categories){
    categories[key].style.color = (key === categoryName) ? 'blue' : 'black';
  }
  
}
for (const key in categories) {
    categories[key].addEventListener('click', function(){
      handleFilter(key);
    });
}