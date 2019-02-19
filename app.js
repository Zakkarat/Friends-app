const img = document.getElementById("imag");
const main = document.getElementsByTagName("main")[0];
const filter = document.getElementById("filter");
const modalWindow = document.getElementsByClassName("modal")[0];
const modalContent = document.getElementsByClassName("modal-content")[0];
const ascAplphabet = document.getElementById("ascAplphabet");
const descAlphabet = document.getElementById("descAlphabet");
const ascAge = document.getElementById("ascAge");
const descAge = document.getElementById("descAge");
const male = document.getElementById("male");
const female = document.getElementById("female");
const outer = document.getElementsByClassName("outerCont")[0];
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
                                  people = staticPeople;
                                  AddCard(staticPeople);
                                });

filter.addEventListener("click", function() {popUp()});

outer.addEventListener("click", function(element) {detectFunction(element)});

document.addEventListener("click", function() {genderFilter()});
function ascAlphabet(){
  let sortedArr = people.sort(function(a, b){
      if(a.name.first < b.name.first) { return -1; }
      else if(a.name.first > b.name.first) { return 1; }
      else if(a.name.last < b.name.last) { return -1; }
      else if(a.name.last > b.name.last) { return 1; }
      return 0;
  });
  render(sortedArr);
}
function ascAgee(){
  let sortedArr = people.sort(function(a, b){
      return a.dob.age - b.dob.age;
  });
  render(sortedArr);
}

function genderFilter(){
  let sortedArr = people.filter(elem => elem.gender == "male");
    render(sortedArr);
}
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

function detectFunction(a) {
  let target = a.target;
  while (target != outer) {
  if (target.tagName == 'BUTTON') {
    champAuto(target);
    return;
  }
  target = target.parentNode;
}}


function popUp() {
  modalWindow.classList.toggle("modal-up");
  modalContent.classList.toggle("modal-content-up");
}
