Rapport de Réflexion : De Procédural à Module Pattern

Objectif du Refactor : Convertir un panier d'achat basé sur des variables et fonctions globales (approche procédurale) en un système utilisant le Module Pattern pour garantir l'encapsulation et éviter la pollution de l'espace global.

Défis rencontrés lors du Refactor

Le principal défi n'était pas la complexité fonctionnelle (la logique d'ajout/suppression est restée la même), mais plutôt la reconfiguration de l'accès aux données.

Changement d'Accès aux Données : Dans l'approche procédurale, la liste du panier (shoppingCart) était directement accessible à toutes les fonctions. Lors du passage au Module Pattern, cette liste a été renommée cart et placée dans la fermeture (closure) de l'IIFE, la rendant privée. J'ai dû m'assurer que toutes les fonctions du module (addItem, removeItem, etc.) accédaient correctement à cette variable interne et non plus à une variable globale.

Gestion des Utilitaires : J'ai introduit une fonction utilitaire privée (calculateTotal) pour illustrer que les modules permettent de masquer les fonctions internes qui ne sont pas nécessaires à l'interface publique, un concept non pertinent dans le code purement procédural où tout est public par défaut.

Amélioration du Code par le Design Pattern

L'utilisation du Module Pattern a apporté des améliorations significatives :

Encapsulation et Sécurité (Le plus important) : La variable d'état du panier est maintenant protégée contre les modifications accidentelles ou malveillantes depuis l'extérieur. Le client doit utiliser l'interface publique (ShoppingCartModule.addItem()) pour interagir avec le panier, garantissant que la logique métier (validation des quantités, mise à jour, etc.) est toujours respectée.

Prévention de la Pollution de l'Espace Global : Le code procédural a créé quatre fonctions globales (addItem, removeItem, viewCart, clearCart) et une variable globale (shoppingCart). Le code refactorisé n'expose qu'un seul objet global (ShoppingCartModule), regroupant toutes les fonctionnalités sous un seul nom.

Organisation et Maintenance : Le code est plus structuré et les responsabilités sont clairement définies. L'interface publique est séparée des détails d'implémentation (les fonctions et variables privées), ce qui facilite la maintenance future.

Quand choisir un Design Pattern plutôt que le Code Procédural ?

Bien que le code procédural soit rapide à écrire pour de petites tâches, un design pattern doit être privilégié dès que l'application :

Gère un État Critique : Si l'état (comme un panier d'achat, des paramètres de configuration ou des données utilisateur) doit être cohérent et ne doit pas être altéré par inadvertance.

Implique des Systèmes Multiples et Dépendants : Pour des projets de taille moyenne à grande, les patterns offrent un cadre qui rend les intentions de conception claires pour les futurs développeurs.

Nécessite de la Réutilisabilité : Les patterns comme le Module ou le Factory facilitent la création de composants autonomes qui peuvent être réutilisés dans différentes parties du code ou dans d'autres projets sans conflit.