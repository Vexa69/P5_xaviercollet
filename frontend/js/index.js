function manageBasketDisplay() {
	//Vérifier si le panier possède au moins une caméra :
	if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
		document.querySelector("#basketPage").parentNode.hidden = true;
	} else {
		document.querySelector("#basketPage").parentNode.hidden = false;
	}
}

function displayCamerasIndex() {
	fetch("http://localhost:3000/api/cameras/") //appel api, callback
		.then(response => {
			//fonction anonyme prend pour parametre response et return response.json
			return response.json();
		})
		.then(function (data) {
			for (let i = 0; i < data.length; i++) {
				displayOneCamera(data[i]);
			}
		});
}

function displayOneCamera(camera) {
	// Création des éléments
	let cameras = document.querySelector(".cameras"),
		cameraItem = document.createElement("div"),
		cameraItemBody = document.createElement("div"),
		name = document.createElement("h4"),
		price = document.createElement("h5"),
		description = document.createElement("p"),
		image = document.createElement("img"),
		productPageLink = document.createElement("a"),
		urlPage = "../html/product.html?id=" + camera._id;

	// Remplissage
	name.appendChild(document.createTextNode(camera.name));
	image.src = camera.imageUrl;
	price.appendChild(document.createTextNode((camera.price / 100).toLocaleString("en") + " €"));
	description.appendChild(document.createTextNode(camera.description));
	productPageLink.appendChild(document.createTextNode("Voir la page du produit"));
	productPageLink.setAttribute("href", urlPage);

	//Stylisation
	productPageLink.classList.add("btn", "btn-secondary");
	productPageLink.setAttribute("role", "button");
	cameraItem.classList.add("card", "border-light", "text-center", "w-25", "m-4");
	image.classList.add("card-img-top");
	cameraItemBody.classList.add("card-body");
	name.classList.add("card-title");
	productPageLink.classList.add("card-footer");

	// Placement des éléments de la camera dans son li
	cameraItemBody.appendChild(price);
	cameraItemBody.appendChild(description);
	cameraItem.appendChild(name);
	cameraItem.appendChild(image);
	cameraItem.appendChild(cameraItemBody);
	cameraItem.appendChild(productPageLink);

	// Placement de la camera dans le ul
	cameras.appendChild(cameraItem);
}

manageBasketDisplay();
displayCamerasIndex();
