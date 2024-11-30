class CartManager {
    constructor() {
        this.activeDropdown = null;
        this.activeSelector = null;
        this.initialized = false;
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // Prevent multiple initializations
        if (this.initialized) return;
        this.initialized = true;

        // Handle size and color selectors
        document.querySelectorAll('.size-selector, .color-selector').forEach(selector => {
            selector.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const type = selector.classList.contains('size-selector') ? 'size' : 'color';
                const dropdown = selector.nextElementSibling;
                
                // If clicking the same selector, just toggle it
                if (this.activeSelector === selector) {
                    this.toggleDropdown(dropdown, selector);
                    return;
                }

                // Close any open dropdown
                if (this.activeDropdown) {
                    this.closeDropdown(this.activeDropdown);
                }

                // Open the new dropdown
                if (dropdown) {
                    this.openDropdown(dropdown, selector);
                }
            });
        });

        // Handle size and color options
        document.querySelectorAll('.size-option, .color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (option.classList.contains('disabled')) return;
                
                const type = option.classList.contains('size-option') ? 'size' : 'color';
                const cartItem = option.closest('.cart-item');
                const value = option.getAttribute(`data-${type}`);
                const selector = cartItem.querySelector(`.${type}-selector`);
                const dropdown = option.closest(`.${type}-dropdown`);
                
                if (selector && value && dropdown) {
                    // Update the selector text and data attribute
                    selector.textContent = value;
                    cartItem.setAttribute(`data-${type}`, value);
                    
                    // Update selected state
                    dropdown.querySelectorAll(`.${type}-option`).forEach(opt => {
                        const isSelected = opt === option;
                        opt.classList.toggle('selected', isSelected);
                        opt.setAttribute('aria-selected', isSelected);
                    });
                    
                    // Close the dropdown
                    this.closeDropdown(dropdown);
                }
            });
        });

        // Handle quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            // Remove any existing event listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const cartItem = newBtn.closest('.cart-item');
                const quantityElement = cartItem.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                
                if (newBtn.dataset.action === 'increase' && quantity < 10) {
                    quantity++;
                } else if (newBtn.dataset.action === 'decrease' && quantity > 1) {
                    quantity--;
                }
                
                quantityElement.textContent = quantity;
                quantityElement.setAttribute('aria-valuenow', quantity);
                this.updateTotal();
            });
        });

        // Handle continue button
        const continueBtn = document.querySelector('.continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCheckout();
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.item-options')) {
                this.closeAllDropdowns();
            }
        });

        // Initial total update
        this.updateTotal();
    }

    openDropdown(dropdown, selector) {
        // Position the dropdown
        const selectorRect = selector.getBoundingClientRect();
        const itemDetails = selector.closest('.item-details');
        const itemRect = itemDetails.getBoundingClientRect();
        
        dropdown.style.position = 'absolute';
        dropdown.style.top = `${selectorRect.height + 2}px`;
        dropdown.style.left = '0';
        dropdown.style.minWidth = `${Math.max(selectorRect.width, 80)}px`;
        
        // Show the dropdown
        dropdown.classList.add('active');
        selector.setAttribute('aria-expanded', 'true');
        
        // Update active elements
        this.activeDropdown = dropdown;
        this.activeSelector = selector;
    }

    closeDropdown(dropdown) {
        if (dropdown) {
            dropdown.classList.remove('active');
            const selector = dropdown.previousElementSibling;
            if (selector) {
                selector.setAttribute('aria-expanded', 'false');
            }
            if (this.activeDropdown === dropdown) {
                this.activeDropdown = null;
                this.activeSelector = null;
            }
        }
    }

    toggleDropdown(dropdown, selector) {
        if (dropdown.classList.contains('active')) {
            this.closeDropdown(dropdown);
        } else {
            this.openDropdown(dropdown, selector);
        }
    }

    closeAllDropdowns() {
        document.querySelectorAll('.size-dropdown.active, .color-dropdown.active').forEach(dropdown => {
            this.closeDropdown(dropdown);
        });
    }

    updateTotal() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            total += price * quantity;
        });

        const totalElement = document.querySelector('.total span');
        if (totalElement) {
            totalElement.innerHTML = `<b>TOTAL    $ ${total.toFixed(2)}</b>`;
        }

        // Update cart count
        const cartCountElement = document.querySelector('.header-action');
        if (cartCountElement) {
            let totalItems = 0;
            document.querySelectorAll('.cart-item .quantity').forEach(qty => {
                totalItems += parseInt(qty.textContent);
            });
            cartCountElement.textContent = `SHOPPING BAG (${totalItems})`;
        }
    }

    handleCheckout() {
        const orderItems = [];
        document.querySelectorAll('.cart-item').forEach(item => {
            orderItems.push({
                title: item.querySelector('.item-title').textContent,
                price: parseFloat(item.querySelector('.item-price').textContent.replace('$', '')),
                size: item.dataset.size,
                color: item.dataset.color,
                quantity: parseInt(item.querySelector('.quantity').textContent)
            });
        });

        if (orderItems.length === 0) {
            alert('Your cart is empty');
            return;
        }

        const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        console.log('Processing order:', { items: orderItems, total });
        alert('Proceeding to checkout...');
    }
}

// Initialize cart manager
new CartManager();

export default CartManager;