/**
 * PARTIE 1 : Panier d'Achat en Programmation Procédurale
 * * Ce code utilise des variables globales pour stocker l'état du panier
 * et des fonctions globales pour les manipuler.
 * * Inconvénient: 'shoppingCart' est accessible et modifiable par n'importe quel autre script,
 * ce qui rend le code fragile et difficile à maintenir.
 */

// -----------------------------------------------------------
// VARIABLE GLOBALE : Stocke l'état du panier d'achat
// -----------------------------------------------------------
let shoppingCart = [];

/**
 * Ajoute un article au panier ou met à jour sa quantité s'il existe déjà.
 * @param {string} name - Nom de l'article.
 * @param {number} quantity - Quantité à ajouter.
 * @param {number} price - Prix unitaire de l'article.
 */
function addItem(name, quantity, price) {
    if (quantity <= 0 || price <= 0) {
        console.error("Erreur: La quantité et le prix doivent être positifs.");
        return;
    }

    const itemIndex = shoppingCart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        // L'article existe: mettre à jour la quantité
        shoppingCart[itemIndex].quantity += quantity;
        console.log(`Article mis à jour: ${name} (x${shoppingCart[itemIndex].quantity})`);
    } else {
        // L'article n'existe pas: l'ajouter
        shoppingCart.push({ name, quantity, price });
        console.log(`Article ajouté: ${name} (x${quantity})`);
    }
}

/**
 * Retire un article du panier en utilisant son nom.
 * @param {string} name - Nom de l'article à retirer.
 */
function removeItem(name) {
    const initialLength = shoppingCart.length;
    shoppingCart = shoppingCart.filter(item => item.name !== name);

    if (shoppingCart.length < initialLength) {
        console.log(`Article retiré: ${name}`);
    } else {
        console.warn(`Article non trouvé: ${name}`);
    }
}

/**
 * Calcule et affiche tous les articles et le prix total.
 */
function viewCart() {
    let totalPrice = 0;
    console.log("\n--- Contenu du Panier ---");

    if (shoppingCart.length === 0) {
        console.log("Le panier est vide.");
        console.log("-------------------------\n");
        return;
    }

    shoppingCart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        totalPrice += itemTotal;
        // Formatage pour l'exemple (utilisation de TND comme devise)
        console.log(`${item.name} (x${item.quantity}) - ${itemTotal.toFixed(2)} TND`);
    });

    console.log(`\nTotal: ${totalPrice.toFixed(2)} TND`);
    console.log("-------------------------\n");
}

/**
 * Vide entièrement le panier d'achat.
 */
function clearCart() {
    shoppingCart = [];
    console.log("Le panier a été vidé.");
}

// --- Exemple de Comportement ---
console.log("--- TEST DU CODE PROCÉDURAL ---");
addItem("Apple", 2, 1.5);    // Ajouté
addItem("Orange", 3, 2.0);   // Ajouté
addItem("Apple", 1, 1.5);    // Mis à jour (Apple x3)
viewCart();                  // Total: 7.50 TND (Apple: 4.50 + Orange: 6.00)

removeItem("Apple");         // Retiré
viewCart();                  // Total: 6.00 TND

clearCart();
viewCart();                  // Panier vide

// DANGER DE LA PROGRAMMATION PROCÉDURALE:
// Un script externe pourrait accidentellement modifier la variable globale:
console.log("\n--- Le danger de la manipulation directe ---");
shoppingCart.push({ name: "HACKED", quantity: 99, price: 0 });
viewCart();