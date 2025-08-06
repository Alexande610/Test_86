// Dữ liệu sản phẩm sẽ được tích hợp từ backend
const products = [];

// Quản lý lịch sử tìm kiếm
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchSuggestions = document.getElementById('searchSuggestions');
const historyItems = document.getElementById('historyItems');
const clearHistory = document.getElementById('clearHistory');

// Hiển thị lịch sử tìm kiếm
function displaySearchHistory() {
    historyItems.innerHTML = '';
    searchHistory.slice(-5).reverse().forEach(term => {
        const historyItem = document.createElement('span');
        historyItem.className = 'history-item';
        historyItem.textContent = term;
        historyItem.onclick = () => {
            searchInput.value = term;
            performSearch(term);
            hideSearchSuggestions();
        };
        historyItems.appendChild(historyItem);
    });
}

// Hiển thị gợi ý tìm kiếm
function showSearchSuggestions(query = '') {
    searchSuggestions.innerHTML = '';
    
    // Hiển thị lịch sử nếu không có query
    if (!query.trim()) {
        const historyDiv = document.createElement('div');
        historyDiv.className = 'search-history';
        historyDiv.innerHTML = `
            <div class="search-history-title">
                Tìm kiếm gần đây 
                <span class="clear-history" onclick="clearSearchHistory()">Xóa</span>
            </div>
            <div id="historyItemsInner"></div>
        `;
        searchSuggestions.appendChild(historyDiv);
        
        const historyItemsInner = document.getElementById('historyItemsInner');
        searchHistory.slice(-5).reverse().forEach(term => {
            const historyItem = document.createElement('span');
            historyItem.className = 'history-item';
            historyItem.textContent = term;
            historyItem.onclick = () => {
                searchInput.value = term;
                performSearch(term);
                hideSearchSuggestions();
            };
            historyItemsInner.appendChild(historyItem);
        });
    } else {
        // Hiển thị gợi ý sản phẩm
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);

        filteredProducts.forEach(product => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerHTML = `
                <div><strong>${product.name}</strong></div>
                <div class="suggestion-category">${getCategoryName(product.category)} • ${formatPrice(product.price)}</div>
            `;
            suggestionItem.onclick = () => {
                searchInput.value = product.name;
                performSearch(product.name);
                hideSearchSuggestions();
            };
            searchSuggestions.appendChild(suggestionItem);
        });

        // Thêm gợi ý danh mục
        const categories = [...new Set(filteredProducts.map(p => p.category))];
        if (categories.length > 0) {
            categories.forEach(category => {
                const categoryItem = document.createElement('div');
                categoryItem.className = 'suggestion-item';
                categoryItem.innerHTML = `
                    <div><i class="fas fa-tag"></i> Xem tất cả trong <strong>${getCategoryName(category)}</strong></div>
                `;
                categoryItem.onclick = () => {
                    filterByCategory(category);
                    hideSearchSuggestions();
                };
                searchSuggestions.appendChild(categoryItem);
            });
        }
    }
    
    searchSuggestions.style.display = 'block';
}

function hideSearchSuggestions() {
    searchSuggestions.style.display = 'none';
}

function getCategoryName(category) {
    const categoryNames = {
        'skincare': 'Chăm sóc da',
        'makeup': 'Trang điểm',
        'haircare': 'Dưỡng tóc',
        'suncare': 'Chống nắng',
        'essential-oils': 'Tinh dầu',
        'body-care': 'Chăm sóc cơ thể'
    };
    return categoryNames[category] || category;
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
}

// Thực hiện tìm kiếm
function performSearch(query) {
    if (query.trim()) {
        // Lưu vào lịch sử
        if (!searchHistory.includes(query)) {
            searchHistory.push(query);
            if (searchHistory.length > 10) {
                searchHistory.shift();
            }
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
        
        // Hiển thị kết quả tìm kiếm (có thể chuyển hướng đến trang kết quả)
        alert(`Tìm kiếm: "${query}"\nKết quả: ${getSearchResults(query).length} sản phẩm`);
    }
}

function getSearchResults(query) {
    return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
}

function filterByCategory(category) {
    const categoryResults = products.filter(p => p.category === category);
    alert(`Danh mục: ${getCategoryName(category)}\nCó ${categoryResults.length} sản phẩm`);
}

function clearSearchHistory() {
    searchHistory = [];
    localStorage.removeItem('searchHistory');
    hideSearchSuggestions();
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    showSearchSuggestions(query);
});

searchInput.addEventListener('focus', () => {
    showSearchSuggestions(searchInput.value);
});

searchBtn.addEventListener('click', () => {
    performSearch(searchInput.value);
    hideSearchSuggestions();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
        hideSearchSuggestions();
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        hideSearchSuggestions();
    }
});

// Ngăn không cho suggestions bị ẩn khi click vào chính nó
searchSuggestions.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Category dropdown navigation
document.querySelectorAll('[data-category]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        filterByCategory(category);
    });
});

// Initialize
displaySearchHistory();
