Refactoring Reflection Report: Procedural to Module Pattern

Refactoring Goal: To convert a shopping cart based on global variables and functions (procedural approach) into a system using the Module Pattern to ensure encapsulation and prevent global scope pollution.

Challenges Encountered During Refactor

The main challenge was not functional complexity (the add/remove logic remained the same), but rather the reconfiguration of data access.

Change in Data Access: In the procedural approach, the cart list (shoppingCart) was directly accessible to all functions. When transitioning to the Module Pattern, this list was renamed cart and placed within the Immediately Invoked Function Expression's (IIFE) closure, making it private. I had to ensure that all module functions (addItem, removeItem, etc.) correctly accessed this internal variable and no longer a global one.

Utility Management: I introduced a private utility function (calculateTotal) to illustrate that modules allow hiding internal functions unnecessary for the public interface, a concept irrelevant in purely procedural code where everything is public by default.

Code Improvement through Design Pattern

Using the Module Pattern brought significant improvements:

Encapsulation and Security (The most important): The cart state variable is now protected against accidental or malicious modifications from the outside. The client must use the public interface (ShoppingCartModule.addItem()) to interact with the cart, ensuring that business logic (quantity validation, updates, etc.) is always respected.

Global Scope Pollution Prevention: The procedural code created four global functions (addItem, removeItem, viewCart, clearCart) and one global variable (shoppingCart). The refactored code exposes only one global object (ShoppingCartModule), grouping all functionalities under a single namespace.

Organization and Maintenance: The code is more structured, and responsibilities are clearly defined. The public interface is separated from the implementation details (private functions and variables), which facilitates future maintenance.

When to Choose a Design Pattern over Procedural Code?

Although procedural code is quick to write for small tasks, a design pattern should be preferred as soon as the application:

Manages Critical State: If the state (such as a shopping cart, configuration settings, or user data) must be consistent and should not be unintentionally altered.

Involves Multiple, Dependent Systems: For medium to large projects, patterns offer a framework that makes design intentions clear to future developers.

Requires Reusability: Patterns like the Module or Factory facilitate the creation of self-contained components that can be reused in different parts of the code or in other projects without conflict.