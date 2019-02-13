const img = document.getElementById("imag");
const main = document.getElementsByTagName("main")[0];
let object;

fetch('https://randomuser.me/api/?results=30')
                                .then(function(response){
                                  if(response.ok){
                                    return response.json();
                                  }
                                })
                                .then(function(data) {
                                  AddCard(data);
                                });

function AddCard(data) {
  let people = data.results;
  people.forEach(function(info) {
    CapitalNames(info);
    main.innerHTML += `<div class="card">
      <img src="${info.picture.large}" id="imag" />
      <h1>${info.name.first} ${info.name.last}</h1>
      <h3>Age: ${info.dob.age}</h3>
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
