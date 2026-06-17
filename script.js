// ===== КНИГИ =====
var books = [
    { author: 'К.Г. Паустовский', title: '"Кара-бугаз"', price: 417, image: 'img/1.jpg' },
    { author: 'Н.В. Гоголь', title: '"Мёртвые души"', price: 672, image: 'img/2.webp' },
    { author: 'М.Ю. Лермонтов', title: '"Маскарад"', price: 375, image: 'img/3.jpg' },
    { author: 'М.А. Булгаков', title: '"Собачье сердце"', price: 569, image: 'img/4.jpg' },
    { author: 'И.С. Тургенев', title: '"Дым"', price: 842, image: 'img/5.jpg' }
];

var cart = [];
var myBooks = [];

// !!! ВСТАВЬТЕ СВОИ ССЫЛКИ НА PDF ЗДЕСЬ !!!
var bookPdfLinks = {
    '"Кара-бугаз"': 'pdf/Кара.pdf',
    '"Мёртвые души"': 'pdf/Мертвые.pdf',
    '"Маскарад"': 'pdf/Маскарад.pdf',
    '"Собачье сердце"': 'pdf/Сердце.pdf',
    '"Дым"': 'pdf/Дым.pdf'
};

// ===== ПОКАЗАТЬ КНИГИ В КАТАЛОГЕ =====
function showBooks() {
    var container = document.getElementById('catalog');
    var html = '';
    
    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        html += '<div class="book">';
        html += '<img src="' + book.image + '" alt="Книга">';
        html += '<h4>' + book.author + '</h4>';
        html += '<p>' + book.title + '</p>';
        html += '<p class="price">' + book.price + ' руб.</p>';
        html += '<button onclick="addToCart(' + i + ')">В корзину</button>';
        html += '</div>';
    }
    
    container.innerHTML = html;
}

// ===== ДОБАВИТЬ В КОРЗИНУ =====
function addToCart(index) {
    var book = books[index];
    
    // Проверяем, есть ли уже такая книга в корзине
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].title === book.title && cart[i].author === book.author) {
            alert('Эта книга уже в корзине!');
            return;
        }
    }
    
    cart.push({
        author: book.author,
        title: book.title,
        price: book.price,
        count: 1
    });
    
    updateCart();
}

// ===== ОБНОВИТЬ КОРЗИНУ =====
function updateCart() {
    document.getElementById('badge').textContent = cart.length;
    
    var container = document.getElementById('cartList');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty">Корзина пуста</div>';
        return;
    }
    
    var html = '';
    var totalSum = 0;
    
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        totalSum += item.price;
        
        html += '<div class="cart-item">';
        html += '    <div class="info">';
        html += '        <strong>' + item.title + '</strong>';
        html += '        <span>' + item.author + '</span>';
        html += '    </div>';
        html += '    <div class="price">' + item.price + ' руб.</div>';
        html += '    <button onclick="removeFromCart(' + i + ')">Удалить</button>';
        html += '</div>';
    }
    
    container.innerHTML = html;
    document.getElementById('total').textContent = totalSum;
}

// ===== УДАЛИТЬ ИЗ КОРЗИНЫ =====
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// ===== ПОКАЗАТЬ МОИ КНИГИ =====
function showMyBooks() {
    var container = document.getElementById('myBooksList');
    
    if (!container) {
        console.error('Контейнер myBooksList не найден!');
        return;
    }
    
    if (myBooks.length === 0) {
        container.innerHTML = '<div class="empty">У вас пока нет купленных книг</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < myBooks.length; i++) {
        var book = myBooks[i];
        var pdfLink = bookPdfLinks[book.title] || '#';
        
        html += '<div class="cart-item">';
        html += '    <div class="info">';
        html += '        <strong>' + book.title + '</strong>';
        html += '        <span>' + book.author + '</span>';
        html += '    </div>';
        html += '    <a href="' + pdfLink + '" target="_blank" class="btn-download" style="background: #d4a373; border: none; color: white; padding: 5px 14px; border-radius: 4px; cursor: pointer; text-decoration: none; font-family: Georgia, serif; font-size: 14px;">Скачать</a>';
        html += '</div>';
    }
    
    container.innerHTML = html;
}

// ===== ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ =====
var navLinks = document.querySelectorAll('.nav a[data-page]');

for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function(event) {
        event.preventDefault();
        
        var pageName = this.dataset.page;
        
        // Убираем активный класс у всех ссылок
        document.querySelectorAll('.nav a').forEach(function(link) {
            link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Скрываем все страницы
        document.querySelectorAll('.page').forEach(function(page) {
            page.classList.remove('active');
        });
        
        // Показываем нужную страницу
        var targetPage = document.getElementById('page-' + pageName);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Обновляем содержимое при переключении
        if (pageName === 'cart') {
            updateCart();
        }
        if (pageName === 'about') {
            showMyBooks();
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

loginModal.addEventListener('click', function(event) {
    if (event.target === loginModal) {
        loginModal.classList.remove('show');
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
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

checkoutModal.addEventListener('click', function(event) {
    if (event.target === checkoutModal) {
        checkoutModal.classList.remove('show');
    }
});

document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // === СОХРАНЯЕМ КНИГИ В "МОИ КНИГИ" ===
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        // Добавляем книгу один раз (без цикла по count)
        myBooks.push({
            author: item.author,
            title: item.title,
            price: item.price
        });
    }
    
    // Очищаем корзину
    cart = [];
    updateCart();
    
    // Показываем уведомление
    var toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
    
    checkoutModal.classList.remove('show');
    this.reset();
    
    // Обновляем "Мои книги"
    showMyBooks();
});

// ===== ЗАПУСК =====
showBooks();
updateCart();
showMyBooks();

console.log('Сайт работает!');
console.log('Книг в каталоге:', books.length);
console.log('Книг в корзине:', cart.length);
console.log('Купленных книг:', myBooks.length);