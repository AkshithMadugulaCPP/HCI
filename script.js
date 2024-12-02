document.addEventListener("DOMContentLoaded", () => {
    const recommendedItems = document.querySelectorAll(".view-item");
    const productLinks = document.querySelectorAll(".product-link");
    const recentlyViewedContainer = document.getElementById("recently-viewed-items");
    
    // Load recently viewed items from localStorage
    const loadRecentlyViewedItems = () => {
        const recentlyViewedItems = JSON.parse(localStorage.getItem("recentlyViewedItems")) || [];
        recentlyViewedContainer.innerHTML = "";
        recentlyViewedItems.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("item");
            div.innerHTML = `<a href="product-page.html"><img src="${item.imgSrc}" alt="${item.altText}"></a><p class="item-name">${item.name || ''}</p><p class="item-price">${item.price || ''}</p>`;
            recentlyViewedContainer.appendChild(div);
        });
    };

    // Add click event listeners to recommended items
    recommendedItems.forEach(button => {
        button.addEventListener("click", (e) => {
            const parentItem = e.target.closest(".item");
            const itemId = parentItem.dataset.id;
            const imgSrc = parentItem.querySelector("img").src;
            const altText = parentItem.querySelector("img").alt;
            const name = parentItem.querySelector(".item-name").textContent.trim();
            const price = parentItem.querySelector(".item-price").textContent.trim();
            
            let recentlyViewedItems = JSON.parse(localStorage.getItem("recentlyViewedItems")) || [];

            // Remove the item if it already exists to add it at the beginning
            recentlyViewedItems = recentlyViewedItems.filter(item => item.id !== itemId);
            
            // Add the clicked item to the beginning of recently viewed
            recentlyViewedItems.unshift({ id: itemId, imgSrc, altText, name, price });
            localStorage.setItem("recentlyViewedItems", JSON.stringify(recentlyViewedItems));

            loadRecentlyViewedItems();
        });
    });

    // Add click event listeners to product links
    productLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const parentItem = e.target.closest(".item");
            const itemId = parentItem.dataset.id;
            const imgSrc = parentItem.querySelector("img").src;
            const altText = parentItem.querySelector("img").alt;
            const name = parentItem.querySelector(".item-name").textContent.trim();
            const price = parentItem.querySelector(".item-price").textContent.trim();
            
            let recentlyViewedItems = JSON.parse(localStorage.getItem("recentlyViewedItems")) || [];

            // Remove the item if it already exists to add it at the beginning
            recentlyViewedItems = recentlyViewedItems.filter(item => item.id !== itemId);
            
            // Add the clicked item to the beginning of recently viewed
            recentlyViewedItems.unshift({ id: itemId, imgSrc, altText, name, price });
            localStorage.setItem("recentlyViewedItems", JSON.stringify(recentlyViewedItems));

            loadRecentlyViewedItems();
            window.location.href = link.href;
        });
    });

    // Initial load of recently viewed items
    loadRecentlyViewedItems();
});