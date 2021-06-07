let basketItems = JSON.parse(localStorage.getItem("basket"));
let productsID = [];

function manageBasketDisplay() {
	// Vérifier que le panier possède une caméra
	if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
		document.querySelector("#basketPage").parentNode.hidden = true;
	} else {
		document.querySelector("#basketPage").parentNode.hidden = false;
	}
}

function returnToHomePageIfUserEmptyTheBasket() {
	if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
		window.location.href = "index.html";
	}
}

function getBasketItem(i) {
	productsID.push(basketItems[i]._id);
	// Eléments
	let basket = document.querySelector("#basket"),
		basketItem = document.createElement("div"),
		basketItemBody = document.createElement("div"),
		name = document.createElement("h3"),
		price = document.createElement("h4"),
		image = document.createElement("img"),
		productPageLink = document.createElement("a"),
		urlPage = "product.html?id=" + basketItems[i]._id,
		selectedLense = document.createElement("h4"),
		quantity = document.createElement("div"),
		selectedQuantity = document.createElement("input"),
		modifyQuantityButton = document.createElement("button"),
		deleteItemButton = document.createElement("button");

	// Remplissage
	name.appendChild(document.createTextNode(basketItems[i].name));
	image.src = basketItems[i].imageUrl;
	productPageLink.appendChild(document.createTextNode("voir la page du produit"));
	productPageLink.setAttribute("href", urlPage);
	selectedLense.appendChild(document.createTextNode("modifier la quantité"));
	deleteItemButton.appendChild(document.createTextNode("Supprimer"));
	price.appendChild(
		document.createTextNode(
			((basketItems[i].price * basketItems[i].selectedQuantity) / 100).toLocaleString("en") +
				" $"
		)
	);

	// Stylisation
	productPageLink.classList.add("btn", "btn-secondary");
	productPageLink.setAttribute("role", "button");
	basketItem.classList.add("card", "border-light", "text-center", "m-4", "w-25");
	basketItem.setAttribute("data-id", basketItems[i]._id);
	basketItem.setAttribute("data-lense", basketItems[i].selectedLense);
	image.classList.add("card-img-top");
	basketItemBody.classList.add("card-body");
	name.classList.add("card-title");
	productPageLink.classList.add("card-footer");
	quantity.classList.add("d-flex", "flex-row");
	selectedQuantity.classList.add("form-control", "w-25");
	selectedQuantity.setAttribute("value", basketItems[i].selectedQuantity);
	modifyQuantityButton.classList.add("modifyQuantity", "btn", "btn-light", "w-75");
	modifyQuantityButton.addEventListener("click", modifyQuantity, false);
	deleteItemButton.classList.add("deleteItem", "btn", "btn-danger", "m-3");
	deleteItmeButton.addEventListener("click", deleteItem, false);

	//Placement dans le li

	basketItemBody.appendChild(price);
	basketItemBody.appendChild(quantity);
	quantity.appendChild(selectedQuantity);
	quantity.appendChild(modifyQuantityButton);
	basketItem.appendChild(name);
	basketItem.appendChild(selectedLense);
	basketItem.appendChild(image);
	basketItem.appendChild(basketItemBody);
	basketItem.appendChild(deleteItemButton);
	basketItem.appendChild(productPageLink);

	// Placement dans le ul

	basket.appendChild(basketItem);
}

function basket() {
	for (let i = 0; i < basketItems.length; i++) {
		getBasketItem(i);
	}
	totalPrice();
}

function totalPrice() {
	let total = 0;
	for (let j = 0; j < basketItems.length; j++) {
		total = total + basketItems[j].price * basketItems[j].selectedQuantity;
	}
	document
		.querySelector("#total")
		.appendChild(
			document.createTextNode("total : " + (total / 100).toLocaleString("en") + "$")
		);
}

function modifyQuantity() {
	//selection du bouton et de la carte à laquelle ils appartiennent
	let itemCard = event.target.parentNode.parentNode.parentNode;
	//identifier l'item associé dans le local storage
	let itemId = itemCard.getAttribute("data-id");
	let itemLense = itemCard.getAttribute("data-lense");
	let basketItemIndex;
	for (let i = 0; i < basketItems.length; i++) {
		if (itemId === basketItems[i]._id && itemLense === basketItems[i].selectedLense) {
			basketItemIndex = i;
		}
	}
	//modifier la quantité dans le local storage
	basketItems[basketItemIndex].selectedQuantity = event.target.previousSibling.value;
	localStorage.setItem("basket", JSON.stringify(basketItems));
	window.location.reload(true);
	alert("Quantité modifiée !");
}

function deleteItem() {
	//Séléctionner le bouton puis la carte à laquelle il appartient
	let itemCard = event.target.parentNode;
	//Identifier l'item dans le local storage
	let itemId = itemCard.getAttribute("data-id");
	let itemLense = itemCard.getAttribute("data-lense");
	let basketItemIndex;
	for (let i = 0; i < basketItems.length; i++) {
		if (itemId === basketItems[i]._id && itemLense === basketItems[i].selectedLense) {
			basketItemIndex = i;
		}
	}
	//Supprimer l'item dans le local storage
	basketItems.splice(basketItemIndex, 1);
	localStorage.setItem("basket", JSON.stringify(basketItems));
	window.location.reload(true);
	alert("Item supprimé !");
	returnToHomePageIfUserEmptyTheBasket();
}

function checkIfFieldIsValid(input, regExp) {
	return input.value.match(regExp) !== null;
}

function submitPayment() {
	//si la fonction a déja été utilisée on réinitialise le formulaire
	// suppression des div et is-valid ou is-invalid
	let inputs = document.querySelectorAll("input");
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].classList.remove("is-invalid");
		inputs[i].classList.remove("is-valid");
	}
}
