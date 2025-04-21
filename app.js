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

// Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
    const addToCartBtn = document.querySelector(".addToCartButton");

    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            const productTitle = document.querySelector(".productTitle").textContent;
            const productPrice = document.querySelector(".productPrice").textContent;
            const productImg = document.querySelector(".productImg").getAttribute("src");

            const selectedColor = document.querySelector(".color.selected");
            const colorValue = selectedColor ? selectedColor.getAttribute("data-color") || selectedColor.style.backgroundColor : "Default";

            const selectedSize = document.querySelector(".size.selected");
            const sizeValue = selectedSize ? selectedSize.textContent : "Default";

            const cartItem = {
                title: productTitle,
                price: productPrice,
                img: productImg,
                color: colorValue,
                size: sizeValue,
            };

            cart.push(cartItem); // 🟢 Push new item without replacing
            alert("Product added to cart!");
        });
    } else {
        console.error("Add to Cart button not found!");
    }

    // Color selection
    document.querySelectorAll(".color").forEach((colorDiv) => {
        colorDiv.addEventListener("click", () => {
            document.querySelectorAll(".color").forEach((c) => c.classList.remove("selected"));
            colorDiv.classList.add("selected");
        });
    });

    // Size selection
    document.querySelectorAll(".size").forEach((sizeDiv) => {
        sizeDiv.addEventListener("click", () => {
            document.querySelectorAll(".size").forEach((s) => s.classList.remove("selected"));
            sizeDiv.classList.add("selected");
        });
    });
});

// Open Cart Page
function openCartPage() {
    const cartPage = document.getElementById("cartPage");
    const cartItemsContainer = document.querySelector(".cartItems");

    cartItemsContainer.innerHTML = ""; // Clear old view

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='emptyCartMessage'>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cartItem");
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="itemDetails">
                    <p><strong>${item.title}</strong></p>
                    <p>Price: ${item.price}</p>
                    <p>Size: ${item.size}</p>
                    <p>Color: <span class="colorBox" style="background-color:${item.color};"></span> ${item.color}</p>
                </div>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartPage.style.display = "flex";
}

// Close Cart Page
function closeCartPage() {
    document.getElementById("cartPage").style.display = "none";
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    openCartPage(); // Refresh view
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        cart = []; // Clear all items
        alert("Purchase successful!");
        closeCartPage();
    }
}

// Continue Shopping
function continueShopping() {
    window.location.href = "index.html"; // Change to your home page URL
}