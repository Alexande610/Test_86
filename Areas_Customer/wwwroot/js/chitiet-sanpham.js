// Dữ liệu sản phẩm
const productData = {
    // TODO: Replace with actual product data from API
    // Dữ liệu sản phẩm sẽ được tích hợp từ backend
};

// Lấy ID sản phẩm từ URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1';
}

// Load thông tin sản phẩm
function loadProductInfo() {
    const productId = getProductIdFromURL();
    
    // TODO: Replace with actual API call
    // const product = await fetchProductById(productId);
    const product = productData[productId];
    
    if (product) {
        // Update DOM elements with product data
        document.getElementById('productTitle').textContent = product.title;
        document.getElementById('breadcrumbProduct').textContent = product.title;
        document.getElementById('productBadge').textContent = product.badge;
        document.getElementById('productRating').textContent = product.rating;
        document.getElementById('productRatingCount').textContent = product.ratingCount;
        document.getElementById('productCurrentPrice').textContent = product.currentPrice;
        document.getElementById('productCategory').textContent = product.categoryName;
        document.getElementById('productBrand').textContent = product.brand;
        document.getElementById('productExpiry').textContent = product.expiry;
        document.getElementById('productOrigin').textContent = product.origin;
        document.getElementById('productIngredients').textContent = product.ingredients;
        document.getElementById('productUsage').textContent = product.usage;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('mainImage').src = product.image;
        
        // Load product options
        loadProductOptions(product.options);
        
        // Load suggested products
        loadSuggestedProducts(product.category, productId);
        
        // Update page title
        document.title = product.title + ' - LittleFish Beauty Mỹ Phẩm Thiên Nhiên';
    } else {
        // TODO: Handle product not found case
        console.log('Product not found');
        // Redirect to 404 page or show error message
    }
}

// Load tùy chọn sản phẩm
function loadProductOptions(options) {
    const optionsContainer = document.getElementById('productOptions');
    optionsContainer.innerHTML = '';
    
    if (!options) return;
    
    Object.keys(options).forEach(optionName => {
        const optionGroup = document.createElement('div');
        optionGroup.className = 'option-group';
        
        const optionLabel = document.createElement('label');
        optionLabel.className = 'option-label';
        optionLabel.textContent = optionName + ':';
        
        const optionItems = document.createElement('div');
        optionItems.className = 'option-items';
        
        options[optionName].forEach((value, index) => {
            const optionItem = document.createElement('div');
            optionItem.className = 'option-item' + (index === 0 ? ' active' : '');
            optionItem.textContent = value;
            optionItem.onclick = () => selectOption(optionItem, optionName);
            optionItems.appendChild(optionItem);
        });
        
        optionGroup.appendChild(optionLabel);
        optionGroup.appendChild(optionItems);
        optionsContainer.appendChild(optionGroup);
    });
}

// Chọn tùy chọn sản phẩm
function selectOption(selectedItem, optionName) {
    const optionItems = selectedItem.parentNode.querySelectorAll('.option-item');
    optionItems.forEach(item => item.classList.remove('active'));
    selectedItem.classList.add('active');
    
    // TODO: Update price or product variant based on selection
    console.log(`Selected ${optionName}: ${selectedItem.textContent}`);
}

// Load sản phẩm gợi ý
function loadSuggestedProducts(category, currentProductId) {
    const suggestedContainer = document.getElementById('suggestedProductsGrid');
    suggestedContainer.innerHTML = '';
    
    // TODO: Replace with actual API call
    // const suggestedProducts = await fetchSuggestedProducts(category, currentProductId);
    
    // For now, show placeholder
    console.log(`Loading suggested products for category: ${category}`);
    
    // Placeholder for suggested products
    for (let i = 0; i < 4; i++) {
        const productCard = document.createElement('div');
        productCard.className = 'suggested-product-card';
        productCard.innerHTML = `
            <div style="width: 100%; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666;">
                Sản phẩm gợi ý ${i + 1}
            </div>
            <div class="suggested-product-info">
                <h3 class="suggested-product-title">Tên sản phẩm sẽ được tải từ API</h3>
                <div class="suggested-product-price">0₫</div>
                <div class="suggested-product-rating">
                    <span class="suggested-rating-stars">⭐⭐⭐⭐⭐</span>
                    <span>0</span>
                </div>
            </div>
        `;
        
        productCard.onclick = () => {
            // TODO: Navigate to actual product
            console.log(`Navigate to suggested product ${i + 1}`);
        };
        
        suggestedContainer.appendChild(productCard);
    }
}

// Thay đổi hình ảnh chính
function changeMainImage(src) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    }
    
    // Cập nhật thumbnail active
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) {
            thumb.classList.add('active');
        }
    });
}

// Điều khiển số lượng
function increaseQuantity() {
    const input = document.getElementById('productQuantity');
    if (input) {
        let value = parseInt(input.value);
        if (value < 99) {
            input.value = value + 1;
        }
    }
}

function decreaseQuantity() {
    const input = document.getElementById('productQuantity');
    if (input) {
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
        }
    }
}

// Thêm vào giỏ hàng
function addToCart() {
    const quantityInput = document.getElementById('productQuantity');
    const productTitleElement = document.getElementById('productTitle');
    
    if (quantityInput && productTitleElement) {
        const quantity = quantityInput.value;
        const productTitle = productTitleElement.textContent;
        
        // TODO: Integrate with actual cart API
        // await addProductToCart(productId, quantity, selectedOptions);
        
        console.log(`Adding to cart: ${quantity} x ${productTitle}`);
        alert(`Đã thêm ${quantity} x "${productTitle}" vào giỏ hàng!`);
    }
}

// Mua ngay
function buyNow() {
    const quantityInput = document.getElementById('productQuantity');
    const productTitleElement = document.getElementById('productTitle');
    
    if (quantityInput && productTitleElement) {
        const quantity = quantityInput.value;
        const productTitle = productTitleElement.textContent;
        
        // TODO: Integrate with checkout process
        console.log(`Buy now: ${quantity} x ${productTitle}`);
        alert(`Mua ngay ${quantity} x "${productTitle}". Chuyển đến trang thanh toán...`);
    }
}

// Search functionality
// Quản lý lịch sử tìm kiếm
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchFilters = document.getElementById('searchFilters');
const advancedSearchToggle = document.getElementById('advancedSearchToggle');
const priceSlider = document.getElementById('priceSlider');
const priceValue = document.getElementById('priceValue');

// Update price display when slider changes
if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        priceValue.textContent = value.toLocaleString('vi-VN') + '₫';
    });
}

// Hiển thị gợi ý tìm kiếm
function showSearchSuggestions(query = '') {
    if (!searchSuggestions) return;
    
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
                if (searchInput) {
                    searchInput.value = term;
                    performSearch(term);
                    hideSearchSuggestions();
                }
            };
            historyItemsInner.appendChild(historyItem);
        });
    } else {
        // TODO: Integrate with real product search API
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
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
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
        
        // Redirect to products page with search query
        window.location.href = `sanpham.html?search=${encodeURIComponent(query)}`;
    }
    hideSearchSuggestions();
}

function filterByCategory(category) {
    window.location.href = `sanpham.html?category=${category}`;
}

function clearSearchHistory() {
    searchHistory = [];
    localStorage.removeItem('searchHistory');
    hideSearchSuggestions();
}

// Event listeners
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
        if (searchInput) {
            performSearch(searchInput.value);
            hideSearchSuggestions();
        }
    });
}

// Toggle advanced search
if (advancedSearchToggle) {
    advancedSearchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchFilters) {
            const isVisible = searchFilters.style.display === 'block';
            searchFilters.style.display = isVisible ? 'none' : 'block';
            hideSearchSuggestions();
        }
    });
}

// Apply filters
const applyFiltersBtn = document.getElementById('applyFilters');
if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
        const category = document.getElementById('categoryFilter')?.value;
        const maxPrice = document.getElementById('priceSlider')?.value;
        const sortBy = document.getElementById('sortBy')?.value;
        
        let url = 'sanpham.html?';
        if (category) url += `category=${category}&`;
        if (maxPrice && maxPrice < 500000) url += `maxPrice=${maxPrice}&`;
        if (sortBy && sortBy !== 'relevance') url += `sort=${sortBy}&`;
        
        window.location.href = url;
    });
}

// Category dropdown navigation
document.querySelectorAll('[data-category]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        window.location.href = `sanpham.html?category=${category}`;
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        hideSearchSuggestions();
        if (searchFilters) {
            searchFilters.style.display = 'none';
        }
    }
});

// Ngăn không cho suggestions bị ẩn khi click vào chính nó
if (searchSuggestions) {
    searchSuggestions.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Bootstrap dropdown support for categories
const categoryDropdown = document.getElementById('categoryDropdown');
if (categoryDropdown) {
    categoryDropdown.addEventListener('show.bs.dropdown', function() {
        hideSearchSuggestions();
        if (searchFilters) {
            searchFilters.style.display = 'none';
        }
    });
}

// Load thông tin khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    loadProductInfo();
});
