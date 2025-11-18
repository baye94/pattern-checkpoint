/**
 * PART 2: Shopping Cart with the Module Pattern
 * * The Module Pattern uses an IIFE (Immediately Invoked Function Expression)
 * to create a closure. The 'cart' variable is now private
 * and protected from the outside world.
 * Only the exposed functions (returned by the IIFE) are accessible.
 * *
 */

const ShoppingCartModule = (function() {
    // -----------------------------------------------------------
    // PRIVATE VARIABLE: Stores the shopping cart state (not globally accessible)
    // -----------------------------------------------------------
    let cart = [];

    // -----------------------------------------------------------
    // PRIVATE FUNCTION: Internal utility
    // -----------------------------------------------------------
    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    }

    // -----------------------------------------------------------
    // PUBLIC FUNCTIONS: The exposed methods
    // -----------------------------------------------------------

    function addItem(name, quantity, price) {
        if (quantity <= 0 || price <= 0) {
            console.error("Error: Quantity and price must be positive.");
            return;
        }

        const itemIndex = cart.findIndex(item => item.name === name);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += quantity;
            console.log(`Item updated: ${name} (x${cart[itemIndex].quantity})`);
        } else {
            cart.push({ name, quantity, price });
            console.log(`Item added: ${name} (x${quantity})`);
        }
    }

    function removeItem(name) {
        const initialLength = cart.length;
        // Modification is done on the private 'cart' variable
        cart = cart.filter(item => item.name !== name);

        if (cart.length < initialLength) {
            console.log(`Item removed: ${name}`);
        } else {
            console.warn(`Item not found: ${name}`);
        }
    }

    function viewCart() {
        const totalPrice = calculateTotal(); // Using the private function
        console.log("\n--- Cart Contents (MODULE) ---");

        if (cart.length === 0) {
            console.log("The cart is empty.");
            console.log("----------------------------\n");
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.quantity * item.price;
            console.log(`${item.name} (x${item.quantity}) - ${itemTotal.toFixed(2)} TND`);
        });

        console.log(`\nTotal: ${totalPrice.toFixed(2)} TND`);
        console.log("----------------------------\n");
    }

    function clearCart() {
        cart = [];
        console.log("The cart has been cleared.");
    }

    // Expose only the public interface
    return {
        addItem: addItem,
        removeItem: removeItem,
        viewCart: viewCart,
        clearCart: clearCart
        // Note: The 'cart' variable and 'calculateTotal' function are not exposed
    };

})(); // The IIFE is immediately executed, creating the module instance.


// --- Example Behavior (Using the exposed object) ---
console.log("--- TESTING MODULE PATTERN CODE ---");
ShoppingCartModule.addItem("Apple", 2, 1.5);
ShoppingCartModule.addItem("Orange", 3, 2.0);
ShoppingCartModule.addItem("Apple", 1, 1.5);
ShoppingCartModule.viewCart();

ShoppingCartModule.removeItem("Apple");
ShoppingCartModule.viewCart();

ShoppingCartModule.clearCart();
ShoppingCartModule.viewCart();

// Attempt to directly access the private variable (Guaranteed failure):
console.log("\n--- Attempting direct access to cart ---");
console.log("Accessing shoppingCart:", typeof shoppingCart === 'undefined' ? "global variable is undefined" : shoppingCart);
console.log("Accessing ShoppingCartModule.cart:", ShoppingCartModule.cart === undefined ? "private variable is protected" : "ILLEGAL ACCESS!");