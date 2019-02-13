const img = document.getElementById("imag")
let object;

fetch('https://randomuser.me/api/')
                                .then(function(response){
                                  if(response.ok){
                                    return response.json();
                                  }
                                })
                                .then(function(data) {
                                  let people = data.results;
                                  imag.src = people[0].picture.large;
                                });
