
window.addEventListener("load", function() {
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let missionTarget = document.getElementById("missionTarget");
   let form = document.getElementById("launchForm");
   
   // Adjusted fetch json from original selection of Tatooine to be random. 
   
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json) {
         let index = [Math.floor(Math.random()*json.length)];
         missionTarget.innerHTML = 
         `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance} </li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}">`
      });
   });  
  
   form.addEventListener("submit", function(event){
      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`;
      copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch.`;
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else if(isNaN(pilotName.value) === false || isNaN(copilotName.value) === false || isNaN(Number(fuelLevel.value)) === true || isNaN(Number(cargoMass.value)) === true) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else if (Number(cargoMass.value) > 10000 && Number(fuelLevel.value) < 10000) {
         faultyItems.style.visibility = `visible`;
         launchStatus.innerHTML =`Shuttle not ready for launch.`;
         launchStatus.style.color = `red`;
         cargoStatus.innerHTML = `Cargo mass too high for launch.`;
         fuelStatus.innerHTML = `Fuel level too low for launch.`;
         event.preventDefault();   
      } else if (Number(fuelLevel.value) < 10000) {
         faultyItems.style.visibility = `visible`;
         launchStatus.innerHTML =`Shuttle not ready for launch.`;
         launchStatus.style.color = `red`;
         fuelStatus.innerHTML = `Fuel level too low for launch.`;
         event.preventDefault();
      } else if (Number(cargoMass.value) > 10000) {
         faultyItems.style.visibility = `visible`;
         launchStatus.innerHTML =`Shuttle not ready for launch.`;
         launchStatus.style.color = `red`;
         cargoStatus.innerHTML = `Cargo mass too high for launch.`;
         event.preventDefault();
      } else {
         faultyItems.style.visibility =`visible`;
         launchStatus.innerHTML =`Shuttle is ready for launch.`;
         launchStatus.style.color = `green`;
         cargoStatus.innerHTML = `Cargo mass low enough for launch.`;
         fuelStatus.innerHTML = `Fuel level high enough for launch.`;
         event.preventDefault(); 
      };
   });
   document.getElementById('input_field').value = '';
}); 



/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/