
//Agrego array de objetos con datos que vamos a utilizar
const PRODUCTS = [
  {
    id:'product1',
    name: "CR90 corvette",
    model: "CR90 corvette",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: 350,
    length: "150",
    max_atmosphering_speed: "950",
    crew: "30-165",
    passengers: "600",
    cargo_capacity: "3000000",
    consumables: "1 year",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "corvette",
    pilots: [],
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-10T14:20:33.369000Z",
    edited: "2014-12-20T21:23:49.867000Z",
    url: "https://swapi.dev/api/starships/2/",
  },
  {
    id:'product2',
    name: "Star Destroyer",
    model: "Imperial I-class Star Destroyer",
    manufacturer: "Kuat Drive Yards",
    cost_in_credits: 150,
    length: "1,600",
    max_atmosphering_speed: "975",
    crew: "47,060",
    passengers: "n/a",
    cargo_capacity: "36000000",
    consumables: "2 years",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "Star Destroyer",
    pilots: [],
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
    ],
    created: "2014-12-10T15:08:19.848000Z",
    edited: "2014-12-20T21:23:49.870000Z",
    url: "https://swapi.dev/api/starships/3/",
  },
  {
    id:'product3',
    name: "Sentinel-class landing craft",
    model: "Sentinel-class landing craft",
    manufacturer: "Sienar Fleet Systems, Cyngus Spaceworks",
    cost_in_credits: 24,
    length: "38",
    max_atmosphering_speed: "1000",
    crew: "5",
    passengers: "75",
    cargo_capacity: "180000",
    consumables: "1 month",
    hyperdrive_rating: "1.0",
    MGLT: "70",
    starship_class: "landing craft",
    pilots: [],
    films: ["https://swapi.dev/api/films/1/"],
    created: "2014-12-10T15:48:00.586000Z",
    edited: "2014-12-20T21:23:49.873000Z",
    url: "https://swapi.dev/api/starships/5/",
  },
  
];

   //Plantilla para la card
/* <div class="col border border-2">
    <div class="cad h-100">
        <h5 class="card-title">Title</h5>
        <p class="card-text bold-test">Text</p>
    </div>
</div> */

//1: Tomamos el control de los id necesarios e iniciliazamos lo que haga falta.

const cartContainer = document.getElementById('cart');
const catalogueContainer = document.getElementById('catalogue');
const btnClear = document.getElementById('btn-clear').addEventListener('click', () => clearCart());
const total = document.getElementById('total');

let cart = JSON.parse(localStorage.getItem('cart')) || [];


//2: Poblar o inyectar o renderizar las cards dentro del catalogo

PRODUCTS.forEach(p =>{
  const card = document.createElement('div');
  card.className ='col border my-4';
  
  card.innerHTML= `<div class="cad h-100">
  <div class="card-body">
  <h5 class="card-title">${p.name}</h5>
  <p class="card-text bold-test">${p.manufacturer}</p>
  <div class="card-footer">$ ${p.cost_in_credits}</div>
  <div class="card-footer">
  <button id="${p.id}" class="btn btn-success">Buy</button>
  </div>
  </div>`;

  catalogueContainer.appendChild(card);

  const button = document.getElementById(p.id).addEventListener('click', () => 
  buyProduct(p)
  );
} );

function buyProduct(product){

  const exists = cart.some(
    p => p.id === product.id
    );

    if(!exists){
      product.q = 1;
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    }else{
      const index = cart.indexOf(product);
      cart[index].q++;
      localStorage.setItem('cart', JSON.stringify(cart));
    }

  //cart.push(product);
  updateCart()
}

function updateCart(){
  cartContainer.innerHTML = '';
  total.innerText='';
  let cartTotal = 0;
  cart.forEach(p =>{
    const card = document.createElement('div');
    card.className ='col border my-4';
    
    card.innerHTML= `<div class="cad h-100">
    <div class="card-body">
    <h5 class="card-title">${p.name} (${p.q})</h5>
    <p class="card-text bold-test">${p.manufacturer}</p>
    <div class="card-footer">Subtotal $ ${p.cost_in_credits * p.q}</div>
    <div class="card-footer">
    <button id="${p.id}" class="btn btn-danger">Delete</button>
    </div>
    </div>`;
  
    cartContainer.appendChild(card);
    cartTotal = cartTotal + p.q*p.cost_in_credits;
    total.innerText = `(Total: $ ${cartTotal})` ;
  
    const button = document.getElementById(p.id).addEventListener('click', () => 
    delProduct(p)
    );
  } );
}

function delProduct(product){
  //para borrar un elemento por indice suele utilizarse el splice (no confundir con slice)

  const index = cart.indexOf(product);
  
  if(product.q === 1){
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }else{
    cart[index].q--;
    localStorage.setItem('cart', JSON.stringify(cart));
  }



  updateCart();
}

function clearCart(){
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  total.innerHTML = '';
  updateCart();
}

updateCart();



