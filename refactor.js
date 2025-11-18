/**
 * PARTIE 2 : Panier d'Achat avec le Module Pattern
 * * Le Module Pattern utilise une IIFE (Immediately Invoked Function Expression)
 * pour créer une fermeture (closure). La variable 'cart' est désormais privée
 * et protégée de l'extérieur.
 * Seules les fonctions exposées (retournées par l'IIFE) sont accessibles.
 * *
 */

const ShoppingCartModule = (function() {
    // -----------------------------------------------------------
    // VARIABLE PRIVÉE : Stocke l'état du panier d'achat (non accessible globalement)
    // -----------------------------------------------------------
    let cart = [];

    // -----------------------------------------------------------
    // FONCTION PRIVÉE : Utilité interne
    // -----------------------------------------------------------
    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    }

    // -----------------------------------------------------------
    // FONCTIONS PUBLIQUES : Les méthodes exposées
    // -----------------------------------------------------------

    function addItem(name, quantity, price) {
        if (quantity <= 0 || price <= 0) {
            console.error("Erreur: La quantité et le prix doivent être positifs.");
            return;
        }

        const itemIndex = cart.findIndex(item => item.name === name);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += quantity;
            console.log(`Article mis à jour: ${name} (x${cart[itemIndex].quantity})`);
        } else {
            cart.push({ name, quantity, price });
            console.log(`Article ajouté: ${name} (x${quantity})`);
        }
    }

    function removeItem(name) {
        const initialLength = cart.length;
        // La modification se fait sur la variable privée 'cart'
        cart = cart.filter(item => item.name !== name);

        if (cart.length < initialLength) {
            console.log(`Article retiré: ${name}`);
        } else {
            console.warn(`Article non trouvé: ${name}`);
        }
    }

    function viewCart() {
        const totalPrice = calculateTotal(); // Utilisation de la fonction privée
        console.log("\n--- Contenu du Panier (MODULE) ---");

        if (cart.length === 0) {
            console.log("Le panier est vide.");
            console.log("---------------------------------\n");
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.quantity * item.price;
            console.log(`${item.name} (x${item.quantity}) - ${itemTotal.toFixed(2)} TND`);
        });

        console.log(`\nTotal: ${totalPrice.toFixed(2)} TND`);
        console.log("---------------------------------\n");
    }

    function clearCart() {
        cart = [];
        console.log("Le panier a été vidé.");
    }

    // Exposer uniquement l'interface publique
    return {
        addItem: addItem,
        removeItem: removeItem,
        viewCart: viewCart,
        clearCart: clearCart
        // Note: La variable 'cart' et la fonction 'calculateTotal' ne sont pas exposées
    };

})(); // L'IIFE est exécutée immédiatement, créant l'instance du module.


// --- Exemple de Comportement (Utilisation de l'objet exposé) ---
console.log("--- TEST DU CODE MODULE PATTERN ---");
ShoppingCartModule.addItem("Pomme", 2, 1.5);
ShoppingCartModule.addItem("Orange", 3, 2.0);
ShoppingCartModule.addItem("Pomme", 1, 1.5);
ShoppingCartModule.viewCart();

ShoppingCartModule.removeItem("Pomme");
ShoppingCartModule.viewCart();

ShoppingCartModule.clearCart();
ShoppingCartModule.viewCart();

// Tenter d'accéder directement à la variable privée (Échec garanti):
console.log("\n--- Tentative d'accès direct au panier ---");
console.log("Accès à shoppingCart:", typeof shoppingCart === 'undefined' ? "variable globale non définie" : shoppingCart);
console.log("Accès à ShoppingCartModule.cart:", ShoppingCartModule.cart === undefined ? "variable privée protégée" : "ACCÈS ILLÉGAL !");