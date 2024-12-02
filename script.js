
// Handle saving items to the saved list
const saveButtons = document.querySelectorAll('.save-item');

saveButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product-name');
        const productPrice = this.getAttribute('data-product-price');
        const productImage = this.getAttribute('data-product-image');

        // Create saved item data
        const savedItem = {
            name: productName,
            price: productPrice,
            imageUrl: productImage
        };

        // Save item to localStorage
        let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        savedItems.push(savedItem);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));

        // Alert the user
        alert(`${productName} has been saved to your list!`);
    });
});

// Display saved items on the Saved Items page
window.onload = function() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const savedListElement = document.getElementById('saved-list');

    // Clear any previous saved items from the page on load (reset saved items list)
    savedListElement.innerHTML = '';

    savedItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('saved-item');

        itemElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;

        savedListElement.appendChild(itemElement);
    });

    // Add event listener for removing saved items
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeItemFromSaved(index);
        });
    });
};

// Function to remove item from saved list
function removeItemFromSaved(index) {
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

    // Remove the item by index
    savedItems.splice(index, 1);

    // Save the updated list back to localStorage
    localStorage.setItem('savedItems', JSON.stringify(savedItems));

    // Reload the saved items page to reflect changes
    location.reload();
}


document.addEventListener("DOMContentLoaded", function () {
    // Save Item Functionality
    const saveButtons = document.querySelectorAll(".save-item");
    saveButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.dataset.productName;
            alert(`Saved: ${productName}`);
        });
    });

    // Check Availability Functionality
    const checkAvailabilityButtons = document.querySelectorAll(".check-availability");
    checkAvailabilityButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.dataset.productId;
            const sizeSelect = document.querySelector(`#size-select-${productId}`);
            const availabilityStatus = document.querySelector(`#availability-status-${productId}`);
            const selectedSize = sizeSelect.value;

            if (selectedSize === "") {
                availabilityStatus.textContent = "Please select a size first.";
                availabilityStatus.style.color = "red";
                return;
            }

            checkProductAvailability(productId, selectedSize)
                .then(status => {
                    availabilityStatus.textContent = status;
                    availabilityStatus.style.color = status === "Available" ? "green" : "red";
                })
                .catch(err => {
                    availabilityStatus.textContent = "Error checking availability.";
                    availabilityStatus.style.color = "red";
                });
        });
    });

    // Find Stores Functionality
    document.getElementById("find-stores-btn").addEventListener("click", function () {
        const zipCode = document.getElementById("zipcode-input").value;
        const storeList = document.getElementById("store-list");

        if (!zipCode) {
            storeList.innerHTML = "<p>Please enter a zip code.</p>";
            return;
        }

        findStoresByZip(zipCode)
            .then(stores => {
                if (stores.length === 0) {
                    storeList.innerHTML = "<p>No stores found in your area.</p>";
                } else {
                    storeList.innerHTML = `<ul>${stores.map(store => `<li class="store-item">${store}</li>`).join('')}</ul>`;
                }
            })
            .catch(err => {
                storeList.innerHTML = "<p>Error fetching stores.</p>";
            });
    });

    // Store Selection Functionality
    document.getElementById("store-list").addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains('store-item')) {
            const storeName = event.target.textContent;

            // Assign store to each product (customize this logic as needed)
            const products = document.querySelectorAll(".product-item");
            products.forEach(product => {
                const productId = product.id;
                const selectedStoreElement = document.getElementById(`selected-store-${productId}`);
                if (selectedStoreElement) {
                    selectedStoreElement.textContent = storeName;
                }
            });
        }
    });
});

function checkProductAvailability(productId, size) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isAvailable = Math.random() > 0.5; // Random availability
            resolve(isAvailable ? "Available" : "Out of stock");
        }, 1000);
    });
}

function findStoresByZip(zipCode) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const stores = {
                "91767": ["Store A - Pomona", "Store B - Claremont", "Store C - La Verne"],
                "20001": ["Store C - Washington, D.C.", "Store D - Arlington"],
                "30001": ["Store E - Atlanta", "Store F - Marietta"]
            };
            resolve(stores[zipCode] || []);
        }, 1000);
    });
}
