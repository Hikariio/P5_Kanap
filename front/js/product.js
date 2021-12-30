// 1- recuperer l'id dans l'URL
// 2- on va get le produit avec fetch en utilisant l'id dans l'url
// 3- Afficher le produit

const id = (new URLSearchParams(window.location.search)).get("id");
console.log(id);

function getProduct(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`).then(response => response.json());
}


function loadProduct(product) {
    document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.querySelector('#title').innerHTML = `${product.name}`;
    document.querySelector('#price').innerHTML = `${product.price}`;
    document.querySelector('#description').innerHTML = `${product.description}`;
    document.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors.map(color => `<option value="${color}">${color}</option>`).join());
}

function getProductInformation() {
    const color = document.querySelector("#colors").value;
    const quantity = parseInt(document.querySelector("#quantity").value);
    return {
        id,
        color,
        quantity
    };
}

function addLocalStorage(productInformation) {
    const productStorage = JSON.parse (localStorage.getItem('products')) || [];
    console.log(productStorage);
    console.log(productInformation);
    // avant de mettre dans le localStorage il faut check si le produit exist : si oui j'augmente le quantity sinon j'ajoute le produit 
    //Entrer d'un produit dans la tableStorage
    //Si le produit n'est pas dans le tableau ajoute
    //sinon +=1 au produit avec même id
    const index = productStorage.findIndex(p => p.id === productInformation.id && p.color === productInformation.color);
    if (index ===-1){
        productStorage.push(productInformation)
    }
    else{
        productStorage[index].quantity +=productInformation.quantity;
    }
    localStorage.setItem("products", JSON.stringify(productStorage));
}


function addToCart() {
    document.getElementById("addToCart").addEventListener(`click`,(event) => {
        event.preventDefault();
        const productInformation = getProductInformation();
        // avant de mettre dans le localeStorage il faut vérifier qu'il est bien quantity et color 
        if (productInformation.color.length && productInformation.quantity >0){
            addLocalStorage(productInformation);
        }
        alert(productInformation.quantity)
    });
}

async function displayProduct() {
    const product = await getProduct(id);
    loadProduct(product);
    addToCart();
}



displayProduct();



