document.getElementById('apply-discount-btn').addEventListener('click', () => {
  const discountInput = document.getElementById('discount-input');
  let discountValue = parseFloat(discountInput.value);
        if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
    alert('Введите корректное значение скидки от 0 до 100');
    return;
  }
    const cards = document.querySelectorAll('.course-card')
    cards.forEach(card => {
        const originPrice = parseFloat(card.getAttribute('data-price'));
        let discountedPrice = Math.round(originPrice * (1 - discountValue / 100))
        const price = card.querySelector('.price')
        
        price.innerHTML = `<strong>Стоимость:</strong> ${discountedPrice.toLocaleString('ru-RU')} ₽`;
        
    });
})