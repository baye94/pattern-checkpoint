/**
 * PART 1: Shopping Cart using Procedural Programming
 * * This code uses global variables to store the cart state
 * and global functions to manipulate them.
 * * Drawback: 'shoppingCart' is accessible and modifiable by any other script,
 * making the code fragile and difficult to maintain.
 */

// -----------------------------------------------------------
// GLOBAL VARIABLE: Stores the shopping cart state
// -----------------------------------------------------------
let shoppingCart = [];

/**
 * Adds an item to the cart or updates its quantity if it already exists.
 * @param {string} name - Item name.
 * @param {number} quantity - Quantity to add.
 * @param {number} price - Unit price of the item.
 */
function addItem(name, quantity, price) {
    if (quantity <= 0 || price <= 0) {
        console.error("Error: Quantity and price must be positive.");
        return;
    }

    const itemIndex = shoppingCart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        // Item exists: update the quantity
        shoppingCart[itemIndex].quantity += quantity;
        console.log(`Item updated: ${name} (x${shoppingCart[itemIndex].quantity})`);
    } else {
        // Item does not exist: add it
        shoppingCart.push({ name, quantity, price });
        console.log(`Item added: ${name} (x${quantity})`);
    }
}

/**
 * Removes an item from the cart by its name.
 * @param {string} name - Name of the item to remove.
 */
function removeItem(name) {
    const initialLength = shoppingCart.length;
    shoppingCart = shoppingCart.filter(item => item.name !== name);

    if (shoppingCart.length < initialLength) {
        console.log(`Item removed: ${name}`);
    } else {
        console.warn(`Item not found: ${name}`);
    }
}

/**
 * Calculates and displays all items and the total price.
 */
function viewCart() {
    let totalPrice = 0;
    console.log("\n--- Cart Contents ---");

    if (shoppingCart.length === 0) {
        console.log("The cart is empty.");
        console.log("---------------------\n");
        return;
    }

    shoppingCart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        totalPrice += itemTotal;
        // Formatting for the example (using TND as currency)
        console.log(`${item.name} (x${item.quantity}) - ${itemTotal.toFixed(2)} TND`);
    });

    console.log(`\nTotal: ${totalPrice.toFixed(2)} TND`);
    console.log("---------------------\n");
}

/**
 * Clears all items from the shopping cart.
 */
function clearCart() {
    shoppingCart = [];
    console.log("The cart has been cleared.");
}

// --- Example Behavior ---
console.log("--- TESTING PROCEDURAL CODE ---");
addItem("Apple", 2, 1.5);    // Added
addItem("Orange", 3, 2.0);   // Added
addItem("Apple", 1, 1.5);    // Updated (Apple x3)
viewCart();                  // Total: 7.50 TND (Apple: 4.50 + Orange: 6.00)

removeItem("Apple");         // Removed
viewCart();                  // Total: 6.00 TND

clearCart();
viewCart();                  // Empty cart

// DANGER OF PROCEDURAL PROGRAMMING:
// An external script could accidentally modify the global variable:
console.log("\n--- The danger of direct manipulation ---");
shoppingCart.push({ name: "HACKED", quantity: 99, price: 0 });
viewCart();