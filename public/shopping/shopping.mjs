const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    console.log("render product");
    const article = document.createElement('article');

    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.name;
    article.appendChild(img);

    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';
    
    const productName = document.createElement('h3');
    productName.textContent = product.name;
    productDetails.appendChild(productName);
    
    const description = document.createElement('p');
    description.textContent = product.description;
    productDetails.appendChild(description);
    
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${product.price}`;
    productDetails.appendChild(price);
    
    const buttonDiv = document.createElement('div');
    
    const buyButton = document.createElement('button');
    buyButton.className = 'buy-button';
    buyButton.textContent = 'Add to cart';
    
    buyButton.addEventListener('click', () => {
        product.numInCart += 1;
        
        rerenderAllProducts();
        rerenderCart();
    });
    
    buttonDiv.appendChild(buyButton);
    
    if (product.numInCart > 0) {
        const numInCart = document.createElement('span');
        numInCart.className = 'num-in-cart';
        numInCart.textContent = `${product.numInCart} in cart`;
        buttonDiv.appendChild(numInCart);
    }
    
    productDetails.appendChild(buttonDiv);
    article.appendChild(productDetails);
    
    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    const productListSection = document.querySelector('.product-list');
    
    const heading = productListSection.querySelector('h2');
    
    productListSection.innerHTML = '';
    
    productListSection.appendChild(heading);
    
    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            const productCard = renderProductCard(product);
            productListSection.appendChild(productCard);
        }
    }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    
    cartItemsContainer.innerHTML = '';
    
    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            const productText = document.createElement('p');
            productText.textContent = `${product.name} x${product.numInCart}`;
            cartItemsContainer.appendChild(productText);
            
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';
            
            removeButton.addEventListener('click', () => {
                if (product.numInCart > 0) {
                    product.numInCart -= 1;
                }
                
                rerenderAllProducts();
                rerenderCart();
            });
            
            cartItemsContainer.appendChild(removeButton);
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const minPriceStr = minPriceInput.value;
    const maxPriceStr = maxPriceInput.value;
    
    if (minPriceStr !== "" && product.price < parseFloat(minPriceStr)) {
        return false;
    }
    
    if (maxPriceStr !== "" && product.price > parseFloat(maxPriceStr)) {
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    rerenderAllProducts();
    rerenderCart();
    
    minPriceInput.addEventListener('change', rerenderAllProducts);
    maxPriceInput.addEventListener('change', rerenderAllProducts);
    
    minPriceInput.addEventListener('input', rerenderAllProducts);
    maxPriceInput.addEventListener('input', rerenderAllProducts);
});