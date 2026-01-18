const BOOKS_DB = [
    { id: 1, title: "Becoming Better", author: "Ryan Gottfredson", img: "imgs/b1.jpg" },
    { id: 2, title: "Atomic Habits", author: "James Clear", img: "imgs/b2.jpg" },
    { id: 3, title: "Big Magic", author: "Elizabeth Gilbert", img: "imgs/b3.jpg" },
    { id: 4, title: "The Gifts of Imperfection", author: "Brené Brown", img: "imgs/b4.jpg" },
    { id: 5, title: "Mindset", author: "Carol Dweck", img: "imgs/b5.jpg" },
    { id: 6, title: "Start With Why", author: "Simon Sinek", img: "imgs/b6.jpg" },
    { id: 7, title: "The Daily Stoic", author: "Ryan Holiday", img: "imgs/b7.jpg" },
    { id: 8, title: "The Mountain Is You", author: "Brianna Wiest", img: "imgs/b8.jpg" }
];

// state приложения
let myLibrary = JSON.parse(localStorage.getItem('saved_books')) || [];
let searchFilter = "";

// navigation
const navigate = (path) => {
    window.history.pushState({}, "", path);
    console.log(`Current route: ${path}`);
    render();
};

// создание HTML карточки (Helper)
const createBookCard = (book, isCollectionView) => {
    const isAdded = myLibrary.some(b => b.id === book.id);
    
    //выбор кнопок в зависимости от страницы
    const actionButtons = isCollectionView 
        ? `<button class="read-btn" onclick="alert('Reading: ${book.title}')">Read</button>
           <button class="add-btn added" onclick="removeBook(${book.id})" title="Remove from Library">×</button>`
        : `<button class="read-btn" onclick="alert('Reading: ${book.title}')">Read Now</button>
           <button class="add-btn ${isAdded ? 'added' : ''}" onclick="addBook(${book.id})" title="Add to Library">
                <div class="plus-icon"></div>
           </button>`;

    return `
        <article class="book-item">
            <img src="${book.img}" alt="${book.title}" loading="lazy">
            <div class="item-details">
                <h3>${book.title}</h3>
                <p class="author">by ${book.author}</p>
                <div class="actions-group">
                    ${actionButtons}
                </div>
            </div>
        </article>
    `;
};

// рендеринг
const render = () => {
    const container = document.getElementById('app-viewport');
    const path = window.location.pathname;
    
    // счтчик апдейт
    document.getElementById('count-badge').textContent = myLibrary.length;

    if (path === '/my-books') {
        renderCollection(container);
    } else {
        renderCatalog(container);
    }
};

const renderCatalog = (container) => {
    const filtered = BOOKS_DB.filter(book => 
        book.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
        book.author.toLowerCase().includes(searchFilter.toLowerCase())
    );

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center;"><h2>No books found.</h2></div>`;
        return;
    }

    container.innerHTML = filtered.map(book => createBookCard(book, false)).join('');
};

const renderCollection = (container) => {
    if (myLibrary.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center;">
                <h2>Your collection is empty</h2>
                <button class="read-btn" style="width:auto; margin-top:20px; padding: 10px 40px" onclick="navigate('/books')">Find Books</button>
            </div>`;
        return;
    }
    container.innerHTML = myLibrary.map(book => createBookCard(book, true)).join('');
};

// --- Действия (Actions) ---
window.addBook = (id) => {
    if (myLibrary.some(b => b.id === id)) return;
    const book = BOOKS_DB.find(b => b.id === id);
    myLibrary.push(book);
    updateStorage();
};

window.removeBook = (id) => {
    myLibrary = myLibrary.filter(b => b.id !== id);
    updateStorage();
};

const updateStorage = () => {
    localStorage.setItem('saved_books', JSON.stringify(myLibrary));
    render();
};




// Обрабочики событий //

// search
const searchInput = document.getElementById('book-search');
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchFilter = e.target.value;
        if (window.location.pathname !== '/books') {
            window.history.pushState({}, "", '/books');
        }
        render();
    }
});

searchInput.addEventListener('input', (e) => {
    if (e.target.value === "") {
        searchFilter = "";
        render();
    }
});

// theme dark/light
const themeBtn = document.getElementById('theme-switcher');
themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
});

// клик по ссылкам (SPA)
document.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (link) {
        e.preventDefault();
        navigate(link.getAttribute('href'));
    }
});

// кнопки браузера назад/вперед
window.addEventListener('popstate', render);

// Синхронизация при закрытии (Beacon API)
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        const blob = new Blob([JSON.stringify(myLibrary)], { type: 'application/json' });
        navigator.sendBeacon('/api/save-library', blob);
    }
});

// Начальная загрузка темы
const savedTheme = localStorage.getItem('app-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Первый запуск
render();