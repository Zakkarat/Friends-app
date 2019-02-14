const img = document.getElementById("imag");
const main = document.getElementsByTagName("main")[0];
let people;

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
  people = data.results;
  people = noSymbols(people);
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

function noSymbols(people) {
    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
"q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    people = people.filter(info => alphabet.some(letter => letter == info.name.first.charAt(0)));
    return people;
}
