const img = document.getElementById("imag");
const main = document.getElementsByTagName("main")[0];
const filter = document.getElementById("filter");
const modalWindow = document.getElementsByClassName("modal")[0];
const modalContent = document.getElementsByClassName("modal-content")[0];
let staticPeople;
let people;

fetch('https://randomuser.me/api/?results=30&nat=us')
                                .then(function(response){
                                  if(response.ok){
                                    return response.json();
                                  }
                                })
                                .then(function(data) {
                                  staticPeople = data.results;
                                  AddCard(staticPeople);
                                });

filter.addEventListener("click", popUp());

function AddCard(people) {
    people.forEach(function(info) {
    CapitalNames(info);
    info.location.city = CapitalFirst(info.location.city);
    main.innerHTML += `<div class="card">
      <img src="${info.picture.large}" id="imag" />
      <h1>${info.name.first} ${info.name.last}</h1>
      <h3>Age: ${info.dob.age}</h3>
      <h3>Location: ${info.location.city}</h3>
      <h4>Email: ${info.email}</h4>
      <h3>Phone: ${info.phone}</h3>
    </div>`
  })
}

function CapitalFirst(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function CapitalNames(info) {
  info.name.first = CapitalFirst(info.name.first);
  info.name.last = CapitalFirst(info.name.last);
}

function search(info){
  let search = new RegExp(document.getElementById("search").value, "ig");
  people = staticPeople.filter(char => char.name.first.toLowerCase().match(search) || char.name.last.toLowerCase().match(search))
  render(people);
}

function render(filtered) {
  main.innerHTML = ""
  AddCard(filtered);
}

function popUp() {
  modalWindow.classList.toggle("modal-up");
  modalContent.classList.toggle("modal-content-up");
}
