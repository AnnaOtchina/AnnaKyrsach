// ===== ДАННЫЕ КНИГ =====
var books = [
    { author: 'М.А. Булгаков', title: '"Театральный роман тайному другу"', price: 240 },
    { author: 'К.Г. Паустовский', title: '"Кара-бугаз"', price: 417 },
    { author: 'Агата Кристи', title: '"Убийства по алфавиту"', price: 672 },
    { author: 'Николас Спаркс', title: '"Спеши любить"', price: 375 },
    { author: 'Поп Андерсон', title: '"Зовите меня Джо"', price: 569 },
    { author: 'Франк Тилье', title: '"Головоломка"', price: 842 },
    { author: 'Фрэнг Герберт', title: '"Дюна"', price: 1205 }
];

// ===== КОРЗИНА =====
var cart = [];

// ===== ПОКАЗАТЬ КНИГИ =====
function showBooks() {
    var container = document.getElementById('catalog');
    var html = '';
    for (var i = 0; i < books.length; i++) {
        var b = books[i];
        html += `
            <div class="book">
                <img src="https://placehold.co/140x190/2c1810/f5ede6?text=Book" alt="Книга">
                <h4>${b.author}</h4>
                <p>${b.title}</p>
                <p class="price">${b.price} руб.</p>
                <button onclick="addToCart(${i})">В корзину</button>
            </div>
        `;
    }
    container.innerHTML = html;
}

// ===== ДОБАВИТЬ В КОРЗИНУ =====
function addToCart(index) {
    var book = books[index];
    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].title === book.title && cart[i].author === book.author) {
            cart[i].count++;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({
            author: book.author,
            title: book.title,
            price: book.price,
            count: 1
        });
    }
    updateCart();
}

// ===== ОБНОВИТЬ КОРЗИНУ =====
function updateCart() {
    // Обновляем бейдж
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].count;
    }
    document.getElementById('badge').textContent = totalItems;

    // Обновляем список в корзине
    var container = document.getElementById('cartList');
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty">Корзина пуста</div>';
        return;
    }

    var html = '';
    var totalSum = 0;
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var sum = item.price * item.count;
        totalSum += sum;
        html += `
            <div class="cart-item">
                <div class="info">
                    <strong>${item.title}</strong>
                    <span>${item.author}</span>
                    <span style="display:block;font-size:13px;color:#888;">${item.count} шт.</span>
                </div>
                <div class="price">${sum} руб.</div>
                <button onclick="removeFromCart(${i})">Удалить</button>
            </div>
        `;
    }
    container.innerHTML = html;
    document.getElementById('total').textContent = totalSum;
}

// ===== УДАЛИТЬ ИЗ КОРЗИНЫ =====
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// ===== НАВИГАЦИЯ =====
var navLinks = document.querySelectorAll('.nav a');
for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    // Пропускаем кнопку "Войти"
    if (link.classList.contains('btn-login')) continue;
    
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var page = this.dataset.page;
        
        // Убираем активный класс у всех
        for (var j = 0; j < navLinks.length; j++) {
            navLinks[j].classList.remove('active');
        }
        this.classList.add('active');
        
        // Прячем все страницы
        var pages = document.querySelectorAll('.page');
        for (var j = 0; j < pages.length; j++) {
            pages[j].classList.remove('active');
        }
        
        // Показываем нужную
        document.getElementById('page-' + page).classList.add('active');
        
        // Если открыли корзину — обновляем
        if (page === 'cart') {
            updateCart();
        }
    });
}

// ===== МОДАЛКА ВХОДА =====
var loginModal = document.getElementById('loginModal');
document.getElementById('loginBtn').addEventListener('click', function() {
    loginModal.classList.add('show');
});
document.getElementById('loginClose').addEventListener('click', function() {
    loginModal.classList.remove('show');
});
document.getElementById('loginBack').addEventListener('click', function() {
    loginModal.classList.remove('show');
});
loginModal.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('show');
    }
});

// Форма регистрации
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Регистрация выполнена!');
    loginModal.classList.remove('show');
    this.reset();
});

// ===== МОДАЛКА ОФОРМЛЕНИЯ =====
var checkoutModal = document.getElementById('checkoutModal');
document.getElementById('checkoutBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    var sum = 0;
    for (var i = 0; i < cart.length; i++) {
        sum += cart[i].price * cart[i].count;
    }
    document.getElementById('total').textContent = sum;
    checkoutModal.classList.add('show');
});
document.getElementById('checkoutClose').addEventListener('click', function() {
    checkoutModal.classList.remove('show');
});
document.getElementById('checkoutBack').addEventListener('click', function() {
    checkoutModal.classList.remove('show');
});
checkoutModal.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('show');
    }
});

// Форма оформления
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
    
    cart = [];
    updateCart();
    
    checkoutModal.classList.remove('show');
    this.reset();
});

// ===== ЗАПУСК =====
showBooks();
updateCart();