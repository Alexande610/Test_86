// Quản lý lịch sử tìm kiếm
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchFilters = document.getElementById('searchFilters');
const advancedSearchToggle = document.getElementById('advancedSearchToggle');

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
        // TODO: Integrate with real product API for search suggestions
        // For now, show basic search functionality
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.innerHTML = `
            <div><strong>Tìm kiếm: "${query}"</strong></div>
            <div class="suggestion-category">Nhấn Enter để tìm kiếm</div>
        `;
        suggestionItem.onclick = () => {
            performSearch(query);
            hideSearchSuggestions();
        };
        searchSuggestions.appendChild(suggestionItem);
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
        
        // TODO: Integrate with real search API
        // Hiển thị kết quả tìm kiếm
        console.log(`Searching for: "${query}"`);
        // Here you would typically make an API call to search products
        // Example: await searchProducts(query);
        
        // For now, show a placeholder message
        alert(`Tìm kiếm: "${query}"\nChức năng tìm kiếm sẽ được tích hợp với database`);
    }
}

// TODO: Replace with actual API call
function getSearchResults(query) {
    // This should be replaced with actual API call to backend
    console.log(`Getting search results for: ${query}`);
    return [];
}

function filterByCategory(category) {
    // TODO: Integrate with real product filtering API
    console.log(`Filtering by category: ${category}`);
    alert(`Danh mục: ${getCategoryName(category)}\nChức năng lọc sẽ được tích hợp với database`);
}

function clearSearchHistory() {
    searchHistory = [];
    localStorage.removeItem('searchHistory');
    hideSearchSuggestions();
}

// Search Event listeners
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        showSearchSuggestions(query);
    });

    searchInput.addEventListener('focus', () => {
        showSearchSuggestions(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
            hideSearchSuggestions();
        }
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
        hideSearchSuggestions();
    });
}

// Toggle advanced search
if (advancedSearchToggle) {
    advancedSearchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isVisible = searchFilters.style.display === 'block';
        searchFilters.style.display = isVisible ? 'none' : 'block';
        hideSearchSuggestions();
    });
}

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        hideSearchSuggestions();
        if (searchFilters) searchFilters.style.display = 'none';
    }
});

// Advanced search filters
const applyFiltersBtn = document.getElementById('applyFilters');
const priceSlider = document.getElementById('priceSlider');
const priceValue = document.getElementById('priceValue');

// Price slider functionality
if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (value >= 500000) {
            priceValue.textContent = '500.000₫+';
        } else {
            priceValue.textContent = value.toLocaleString('vi-VN') + '₫';
        }
    });
}

if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
        const category = document.getElementById('categoryFilter').value;
        const sortBy = document.getElementById('sortBy').value;
        const maxPrice = parseInt(document.getElementById('priceSlider').value);
        
        // TODO: Integrate with real product filtering API
        console.log('Applied filters:', { category, sortBy, maxPrice });
        
        // Here you would typically make an API call with these filters
        // Example: await filterProducts({ category, sortBy, maxPrice });
        
        const categoryText = category ? ` trong danh mục ${getCategoryName(category)}` : '';
        const priceText = maxPrice < 500000 ? ` với giá tối đa ${maxPrice.toLocaleString('vi-VN')}₫` : '';
        
        alert(`Áp dụng bộ lọc${categoryText}${priceText}\nChức năng lọc sẽ được tích hợp với database`);
        if (searchFilters) searchFilters.style.display = 'none';
    });
}

// Category dropdown navigation
document.querySelectorAll('[data-category]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        filterByCategory(category);
    });
});

// Existing sanpham.html functionality
// Wishlist functionality
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = '#e74c3c';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.color = '';
        }
    });
});

// Add to cart functionality
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang thêm...';
        this.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Đã thêm!';
            this.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
                this.disabled = false;
            }, 2000);
        }, 1000);
    });
});

// View toggle functionality
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Category filter
document.querySelectorAll('.category-list a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.category-list a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Show loading
        document.querySelector('.loading').style.display = 'block';
        document.getElementById('products-container').style.opacity = '0.5';
        
        // Simulate filter
        setTimeout(() => {
            document.querySelector('.loading').style.display = 'none';
            document.getElementById('products-container').style.opacity = '1';
        }, 1500);
    });
});

// Sort functionality
document.querySelector('.sort-dropdown').addEventListener('change', function() {
    document.querySelector('.loading').style.display = 'block';
    document.getElementById('products-container').style.opacity = '0.5';
    
    setTimeout(() => {
        document.querySelector('.loading').style.display = 'none';
        document.getElementById('products-container').style.opacity = '1';
    }, 1000);
});

// Price filter
document.querySelector('.filter-section .btn').addEventListener('click', function() {
    document.querySelector('.loading').style.display = 'block';
    document.getElementById('products-container').style.opacity = '0.5';
    
    setTimeout(() => {
        document.querySelector('.loading').style.display = 'none';
        document.getElementById('products-container').style.opacity = '1';
    }, 1200);
});

// Function to view product detail
function viewProductDetail(productId) {
    // Chuyển đến trang chi tiết sản phẩm với ID
    window.location.href = `chitiet-sanpham.html?id=${productId}`;
}

// Function to add product to cart
function addToCart(productId) {
    // Add product to cart (you can implement cart functionality here)
    alert(`Sản phẩm ${productId} đã được thêm vào giỏ hàng!`);
    
    // Example: Save to localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        id: productId,
        quantity: 1,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}

// View Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsContainer = document.getElementById('products-container');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Check which button was clicked
            if (this.innerHTML.includes('fa-th')) {
                // Grid view
                productsContainer.classList.remove('list-view');
                const productCards = productsContainer.querySelectorAll('[class*="col-"]');
                productCards.forEach(card => {
                    card.className = 'col-lg-4 col-md-6 mb-4';
                });
            } else {
                // List view
                productsContainer.classList.add('list-view');
                const productCards = productsContainer.querySelectorAll('[class*="col-lg-4"]');
                productCards.forEach(card => {
                    card.className = 'col-12 mb-3';
                });
            }
        });
    });
});
