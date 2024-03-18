document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById('products');
    const categoryFilter = document.getElementById('category');
    const ascSort = document.getElementById('ascSort');
    const decSort = document.getElementById('decSort');

    // Fetch data from API
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => displayProducts(data));

    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p><b>Category:</b> ${product.category}</p>
                <p><b>Price:</b> $${product.price}</p>
                <p><b>Description:</b><br> ${product.description}</p>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Filter products by category
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === 'all') {
            fetch('https://fakestoreapi.com/products')
                .then(response => response.json())
                .then(data => displayProducts(data));
        } else {
            fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
                .then(response => response.json())
                .then(data => displayProducts(data));
        }
    });

    // Sort products by price
    ascSort.addEventListener('click', function() {
        sortProductsByPrice('ascSort');
    });

    decSort.addEventListener('click', function() {
        sortProductsByPrice('decSort');
    });
    
    function sortProductsByPrice(order) {
        const sortedProducts = [...productsContainer.children]
            .sort((a, b) => {
                const priceA = parseFloat(a.querySelector('p:nth-child(4)').textContent.split('$')[1]);
                const priceB = parseFloat(b.querySelector('p:nth-child(4)').textContent.split('$')[1]);
                return order === 'ascSort' ? priceA - priceB : priceB - priceA;
            });
    
        sortedProducts.forEach(node => productsContainer.appendChild(node));
    }
    
    
});
