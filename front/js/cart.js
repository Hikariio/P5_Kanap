// récuperer les éléments du localStorage et afficher  (getlocalStorage, getProduct)
// event 'click' pour supprimer ect  ( addEventListener pour bouton supprimer)
// faire une boucle comme dans index mais qui proviens du localStorage 
/* <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->*/


function getProduct(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`).then(response => response.json());
}

function deleteItem(productsStorage,deleteBtn) {
      deleteBtn.addEventListener(`click`,(event) => {
          event.preventDefault();
          //  let id_selectionner_suppression = productStorage[1].id_ProduitSelectionner;
          //  produitEnregistreDansLocalStorage = produitEnregistreDansLocalStorage.filter( el => el.id_ProduitSelectionner !== id_selectionner_suppression);
          //  localStorage.setItem("produit",JSON.stringify(produitEnregistreDansLocalStorage));
          const id = deleteBtn.closest(".cart__item").dataset.id;
          const color = deleteBtn.closest(".cart__item").dataset.color;
          const index = productsStorage.findIndex(p => p.id === id && p.color === color);
          if (index !== -1){
            productsStorage.splice(index,1);
            localStorage.setItem("products", JSON.stringify(productsStorage));
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
          }
      });
};


function initDeleteBtns(productsStorage) {
  const deleteBtns = document.querySelectorAll(".deleteItem");
  for(let i = 0; i < deleteBtns.length; i++) {
    deleteItem(productsStorage,deleteBtns[i]);
  }
}

function changeItem(productsStorage,quantityBtn){
  quantityBtn.addEventListener(`change`,(event) => {
    event.preventDefault();
    const quantity = quantityBtn.value;
    const id = quantityBtn.closest(".cart__item").dataset.id;
    const color = quantityBtn.closest(".cart__item").dataset.color;
    const index = productsStorage.findIndex(p => p.id === id && p.color === color);
    if (index !== -1){
      if (quantity <= 0 ){
        productsStorage.splice(index,1);
        localStorage.setItem("products", JSON.stringify(productsStorage));
        alert("Ce produit a bien été supprimé du panier");
        location.reload();
      } else {
        productsStorage[index].quantity = quantity;
        localStorage.setItem("products", JSON.stringify(productsStorage));
        location.reload();
        let totalPrice = 0
        let totalQuantity = 0
        for(const productStorage of productsStorage) {
          totalPrice += product.price * parseInt(productStorage.quantity);
          totalQuantity += parseInt(productStorage.quantity);
        }
        document.querySelector("#totalQuantity").innerHTML = totalQuantity;
        document.querySelector("#totalPrice").innerHTML = totalPrice;
      }
    }
  });
}

function initChangeQuantity(productsStorage) {
  const quantityBtns = document.querySelectorAll(".itemQuantity");
  for(let i = 0; i < quantityBtns.length; i++) {
    changeItem(productsStorage,quantityBtns[i]);
  }
}

function transformProductToHtml(product,productStorage) {
    document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${productStorage.color}">
    <div class="cart__item__img">
         <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${productStorage.color}</p>
        <p>${product.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productStorage.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
}



async function displayProducts() {
    let totalPrice = 0;
    let totalQuantity = 0;
    const productsStorage = JSON.parse (localStorage.getItem('products')) || [];
    for(const productStorage of productsStorage) {
        const product = await getProduct(productStorage.id);
        transformProductToHtml(product,productStorage);
        totalPrice += product.price * parseInt(productStorage.quantity);
        totalQuantity += parseInt(productStorage.quantity);
    }
    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
    document.querySelector("#totalPrice").innerHTML = totalPrice;
    initDeleteBtns(productsStorage);
    initChangeQuantity(productsStorage);
}

displayProducts();


// Premiere function qui vérifie le formulaire ( faut que les 5 champs soit remplis et bien une email )
// function validate() {
      
//   if( document.myForm.Name.value == "" ) {
//      alert( "Please provide your name!" );
//      document.myForm.Name.focus() ;
//      return false;
//   }
//   if( document.myForm.EMail.value == "" ) {
//      alert( "Please provide your Email!" );
//      document.myForm.EMail.focus() ;
//      return false;
//   }
//   if( document.myForm.Zip.value == "" || isNaN( document.myForm.Zip.value ) ||
//      document.myForm.Zip.value.length != 5 ) {
     
//      alert( "Please provide a zip in the format #####." );
//      document.myForm.Zip.focus() ;
//      return false;
//   }
//   if( document.myForm.Country.value == "-1" ) {
//      alert( "Please provide your country!" );
//      return false;
//   }
//   return( true );
// }
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
 
     
// if( validateEmail(email) === false ) { 
//   blablalbalbls
//   }
// console.log(validateEmail('anystring@anystring.anystring'));

function validate() {
  const confirmationBtn = document.querySelector("#order");
  const form = document.querySelector(`.cart__order__form`);
  confirmationBtn.addEventListener(`click`,(event) => {
    event.preventDefault();
    let isFormValid = true;
    const firstName = form.querySelector(`#firstName`).value;
    const lastName = form.querySelector(`#lastName`).value;
    const address = form.querySelector(`#address`).value;
    const city = form.querySelector(`#city`).value;
    const email = form.querySelector(`#email`).value;
    if( firstName.length <2 ) {
      document.querySelector(`#firstNameErrorMsg`).innerHTML = `firstname Invalide`;
      isFormValid = false;
    } else document.querySelector(`#firstNameErrorMsg`).innerHTML = ``;
    if( lastName.length <2 ) {
      document.querySelector(`#lastNameErrorMsg`).innerHTML = `lastname Invalide`;
      isFormValid = false;
    } else document.querySelector(`#lastNameErrorMsg`).innerHTML = ``;
    if( address.length <5 ) {
      document.querySelector(`#addressErrorMsg`).innerHTML = `adresse Invalide`;
      isFormValid = false;
    } else document.querySelector(`#addressErrorMsg`).innerHTML = ``;
    if( city.length <3 ) {
      document.querySelector(`#cityErrorMsg`).innerHTML = `ville Invalide`;
      isFormValid = false;
    } else document.querySelector(`#cityErrorMsg`).innerHTML = ``;
    if( !validateEmail(email)) {
      document.querySelector(`#emailErrorMsg`).innerHTML = `email Invalide`;
      isFormValid = false;
    } else document.querySelector(`#emailErrorMsg`).innerHTML = ``;
    const productIds = (JSON.parse (localStorage.getItem('products')) || []).map(p => p.id);
    if (productIds.length === 0) {
      alert (`pas de produit dans le panier`);
      return;
    }
    if(isFormValid) {
      const body = {
        contact:{
          firstName:firstName,
          lastName:lastName,
          address:address,
          city:city,
          email:email,
        },
        products: productIds 
      };
      const order = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json" 
         },
       };
       fetch(`http://localhost:3000/api/products/order`, order )
        .then((response) => response.json())
        .then((data) => {
            localStorage.clear();
            window.location.href = 'confirmation.html?orderId='+data.orderId;
        })
        .catch((err) => {
            alert ("Un problème est survenu: " + err.message);
        });
    }
  });
};



validate();