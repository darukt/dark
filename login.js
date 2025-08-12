document.addEventListener('DOMContentLoaded', function() { // Ждем загрузки DOM
    const myDatabase = new MyDB('myDatabaseName'); // Создаем экземпляр базы данных
    const form = document.getElementById('loginForm'); // Получаем форму входа
    form.addEventListener('submit', function(e) { // Добавляем слушатель на отправку формы
        e.preventDefault(); // Отменяем стандартное поведение формы
        try { // Обрабатываем вход пользователя
            const username = document.getElementById('username').value.trim(); // Получаем имя пользователя из поля ввода
            const password = document.getElementById('password').value; // Получаем пароль из поля ввода
            if (!username || !password) { // Проверяем, что поля не пустые
                throw new Error('Пожалуйста, заполните все поля.'); // Если поля пустые, выбрасываем ошибку
            }
            const user = myDatabase.loginUser(username, password); // Пытаемся войти в систему
            
            alert('Вход выполнен успешно!'); // Успешный вход
            document.cookie = `username=${user.username}; path=/; max-age=86400`; // Сохраняем имя пользователя в куки
            document.cookie = `login=true; path=/; max-age=86400`; // Сохраняем статус входа в куки
            window.location.href = 'main.html'; // Перенаправляем на главную страницу
        } catch (error) { // Обрабатываем ошибки
            alert(error.message); // Показываем сообщение об ошибке
        }
    });
});