const wrapper = document.querySelector(".sliderWrapper");
const menuItem = document.querySelectorAll(".menuItem");

const products = [
    {
        id: 1,
        title: "Air Force",
        price: 119,
        colors: [
            {
                code: "black",
                img: "./IMG/air.png",
            },
            {
                code: "darkblue",
                img: "./IMG/air2.png",
            },
        ],
    },
    {
        id: 2,
        title: "Air Jordan",
        price: 149,
        colors: [
            {
                code: "lightgray",
                img: "./IMG/jordan.png",
            },
            {
                code: "green",
                img: "./IMG/jordan2.png",
            },
        ],
    },
    {
        id: 3,
        title: "Blazer",
        price: 109,
        colors: [
            {
                code: "lightgray",
                img: "./IMG/blazer.png",
            },
            {
                code: "green",
                img: "./IMG/blazer2.png",
            },
        ],
    },
    {
        id: 4,
        title: "Crater",
        price: 129,
        colors: [
            {
                code: "black",
                img: "./IMG/crater.png",
            },
            {
                code: "lightgray",
                img: "./IMG/crater2.png",
            },
        ],
    },
    {
        id: 5,
        title: "Hippie",
        price: 99,
        colors: [
            {
                code: "gray",
                img: "./IMG/hippie.png",
            },
            {
                code: "black",
                img: "./IMG/hippie2.png",
            },
        ],
    },
];

let choosenProduct = products[0];
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

// Update product details when a menu item is clicked
menuItem.forEach((item, index) => {
    item.addEventListener("click", () => {
        wrapper.style.transform = `translateX(${-100 * index}vw)`;

        choosenProduct = products[index];

        // Update product details
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;

        // Update product colors
        currentProductColors.forEach((color, index) => {
            color.style.backgroundColor = choosenProduct.colors[index].code;
        });
    });
});

// Change product image when a color is clicked
currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        currentProductImg.src = choosenProduct.colors[index].img;
    });
});

// Highlight selected size
currentProductSizes.forEach((size, index) => {
    size.addEventListener("click", () => {
        currentProductSizes.forEach((size) => {
            size.style.backgroundColor = "white";
            size.style.color = "black";
        });
        size.style.backgroundColor = "black";
        size.style.color = "white";
    });
});

// Payment modal functionality
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

if (productButton) {
    productButton.addEventListener("click", () => {
        payment.style.display = "flex";
    });
}

if (close) {
    close.addEventListener("click", () => {
        payment.style.display = "none";
    });
}

// Cart functionality
let cart = [];

// Add to Cart Functionality
const addToCartButton = document.querySelector(".addToCartButton");

if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
        cart.push({
            title: choosenProduct.title,
            price: choosenProduct.price,
            img: choosenProduct.colors[0].img,
        });
        alert(`${choosenProduct.title} has been added to your cart!`);
    });
} else {
    console.error("ADD TO CART button not found!");
}

// Open Cart Page
function openCartPage() {
    const cartPage = document.getElementById("cartPage");
    const cartItemsContainer = document.querySelector(".cartItems");

    // Clear previous cart items
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='emptyCartMessage'>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cartItem");
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <span>${item.title} - ${item.price}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartPage.style.display = "flex";
}

// Close Cart Page
function closeCartPage() {
    const cartPage = document.getElementById("cartPage");
    cartPage.style.display = "none";
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    openCartPage();
}

// Checkout Functionality
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        cart = []; // Clear the cart
        alert("Purchase successful!");
        closeCartPage();
    }
}