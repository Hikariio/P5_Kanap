// fetch
// 1-avoir la liste des produits
// 2-Transformer la liste en HTML
// 3-Afficher la liste dans le HTML
// Nomenclature 
// Camelcase > monNomDeVariable , monNomDeFonction
// Les noms de function: une action sur quelque chose (ex: pas de stringCleaner ou cleanerString ) Je veux du cleanString

const { response } = require("../../back/app");


function getProducts() {
    fetch("http://localhost:3000/api/products").then(response => response.json())
    // return le fetch
}

function transformProductToHtml(product) {
    document.querySelector('#items');
    // Utilisation des querySelector pour pouvoir formater le produit: objet > HTML
    // <a href="./product.html?id=42">
    //         <article>
    //           <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
    //           <h3 class="productName">Kanap name1</h3>
    //           <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    //         </article>
    //       </a>
    // product = {
    //     "colors": ["Blue", "White", "Black"],
    //     "_id": "107fb5b75607497b96722bda5b504926",
    //     "name": "Kanap Sinopé",
    //     "price": 1849,
    //     "imageUrl": "kanap01.jpeg",
    //     "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     "altTxt": "Photo d'un canapé bleu, deux places"
    //   },
    // Si je veux acceder au nom du produit (product = object) je fais product.name
} 

async function displayProducts() {
    const products = await getProducts(); 
    for(const product of products) {
        transformProductToHtml(product);
    }
}
displayProducts();
