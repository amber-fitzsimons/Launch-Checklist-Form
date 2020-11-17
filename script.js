
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
   
   // Adjusted fetch json from original selection of Tatooine to select a random planet. 
   
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json) {
         let randomPlanet = [Math.floor(Math.random()*json.length)];
         missionTarget.innerHTML = 
         `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[randomPlanet].name}</li>
               <li>Diameter: ${json[randomPlanet].diameter}</li>
               <li>Star: ${json[randomPlanet].star}</li>
               <li>Distance from Earth: ${json[randomPlanet].distance} </li>
               <li>Number of Moons: ${json[randomPlanet].moons}</li>
            </ol>
            <img src="${json[randomPlanet].image}">`
      });
   });  
  
   form.addEventListener("submit", function(event){

      event.preventDefault();

      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`;
      copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch.`;

      // If/else statements that prompt user to enter valid input type into all fields, then give feedback on shuttle and launch status based on fuel and cargo status.

      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");

      } else if(isNaN(pilotName.value) === false || isNaN(copilotName.value) === false || isNaN(Number(fuelLevel.value)) === true || isNaN(Number(cargoMass.value)) === true) {
         alert("Make sure to enter valid information for each field!");

      } else if (Number(fuelLevel.value) < 10000 && Number(cargoMass.value) > 10000) {
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML =`Shuttle not ready for launch.`;
         launchStatus.style.color = `red`;
         fuelStatus.innerHTML = `Fuel level too low for launch.`; 
         cargoStatus.innerHTML = `Cargo mass too heavy for launch.`;
          

      } else if (Number(fuelLevel.value) < 10000 && Number(cargoMass.value) <= 10000) {
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML =`Shuttle not ready for launch.`;
         launchStatus.style.color = `red`;
         fuelStatus.innerHTML = `Fuel level too low for launch.`;

      } else if (Number(fuelLevel.value) >= 10000 && Number(cargoMass.value) > 10000) {
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML =`Shuttle not ready for launch.`;
         launchStatus.style.color = `red`;
         fuelStatus.innerHTML = `Fuel level high enough for launch.`;
         cargoStatus.innerHTML = `Cargo mass too heavy for launch.`;

      } else {
         faultyItems.style.visibility ="visible";
         launchStatus.innerHTML =`Shuttle is ready for launch.`;
         launchStatus.style.color = `green`;
         fuelStatus.innerHTML = `Fuel level high enough for launch.`;
         cargoStatus.innerHTML = `Cargo mass low enough for launch.`;
      };
   });
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