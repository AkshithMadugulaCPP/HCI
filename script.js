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
