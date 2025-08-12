document.addEventListener('DOMContentLoaded', function() {
const myDatabase = new MyDB('myDatabaseName');
const form = document.getElementById('registerForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    try {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value.trim();
    const confirmPassword = document.getElementById('confirm_password').value;
    if (password !== confirmPassword) {
        alert('Пароли не совпадают. Пожалуйста, попробуйте еще раз.');
        return;
    }
        const usernameRegex = /^[a-zA-Z0-9]{3,16}$/; // Регулярное выражение для проверки имени пользователя
        if (!username || !password || !email) {
        alert('Пожалуйста, заполните все поля.');
        }
        if (!usernameRegex.test(username)) {
            throw new Error('Invalid username format');
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&%*^]).{8,128}$/; // Регулярное выражение для проверки пароля
        if (!passwordRegex.test(password)) {
            throw new Error('Invalid password format'); // Проверка на валидность пароля
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/; // Регулярное выражение для проверки email
        if (!emailRegex.test(email)) { // Проверка на валидность email
            throw new Error('Invalid email format');   // Проверка на валидность email
        } 
        myDatabase.registerUser(username, password, email); // Регистрируем пользователя
        window.location.href = 'login.html'; // Перенаправляем на страницу входа
        console.log(myDatabase.all('users')); // Выводим всех пользователей в консоль
    }
    catch (error) { // Обрабатываем ошибки
        alert(error.message); // Показываем сообщение об ошибке
    } // Обрабатываем ошибки
    myDatabase.all('users').forEach(user => { // Выводим всех пользователей в консоль
        console.log(`Username: ${user.username}, Email: ${user.email}`); // Выводим всех пользователей в консоль
    });
});
});