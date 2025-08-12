class MyDB {
    constructor(dbName) {
        this.dbName = dbName; // Инициализирует имя базы данных
        this.data = JSON.parse(localStorage.getItem(dbName)) || {users: []} ; // Инициализирует базу данных из localStorage или создает пустую базу данных
    }
    save(){
        localStorage.setItem(this.dbName, JSON.stringify(this.data)); // Сохраняет данные в localStorage
    }
    all(key) {
        return this.data[key]; // Возвращает все данные по ключу
    }
    add(key, value) {
        if (!this.data[key]) {  // Проверяет существует ли категория
            this.data[key] = [];    // Инициализируем категорию если она не существует
        }
        this.data[key].push(value); // Добавляет значение в категорию
        this.save(); // Сохраняем изменения в базе данных
    }
    remove(key, value) { // Функция для удаления значения из категории
        if (this.data[key]) { // Проверяет существует ли категория
            this.data[key] = this.data[key].filter(item => item !== value); // Удаляет значение из категории
            this.save(); // Сохраняем изменения
        } else {
            throw new Error(`Category ${key} does not exist`);
        }
    }
    find(key, value) { // Функция для поиска пользователя по имени
        if (this.data[key]) { // Проверяет существует ли категория
            return this.data[key].find(item => item.username === value); // Ищет пользователя по имени
        }
        return null; // Возвращает null если не найдено
    }
    registerUser(username, password, email){ // Функция для регистрации пользователя
        if (!this.data.users) { // Проверяет существует ли массив users
            this.data.users = []; // Инициализируем массив users если он не существует
        } // Проверяет существует ли массив users
        const userExists = this.data.users.some(user => user.username === username); // Проверяет существует ли пользователь с таким именем
        if (userExists) { // Проверяет существует ли пользователь с таким именем
            throw new Error('User already exists'); // Проверяет существует ли пользователь с таким именем
        }
        
        this.data.users.push({username, password, email}); // Добавляет нового пользователя в массив users
        this.save(); // Сохраняем пользователя в базе данных
        return true; // Возвращает true если пользователь успешно зарегистрирован
    }
    loginUser(username, password) { // Функция для входа пользователя
        const user = this.data.users.find(user => user.username === username && user.password === password); // Ищем пользователя по имени и паролю
        if (user) { // Если пользователь найден
            return user; // Возвращает пользователя если найден
        } else {
            throw new Error('Invalid username or password'); // Если пользователь не найден, выбрасываем ошибку
        }
    }
    clearCategory(key){ // Очищает категорию в базе данных
        if (this.data[key]){ // Проверяет существует ли категория
            this.data[key] = [];   // Очищает категорию
            this.save(); // Сохраняет изменения
        }
    }
    clearDB(){ // Очищает базу данных
        this.data = { users: [] }; // Сбрасывает данные
        this.save(); // Сохраняет пустую базу данных
    }
}
}