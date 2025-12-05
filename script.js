
// Hämtar element för informationbox
const InformationBox = document.getElementById('informationBox');

// Skapar stjärnor i bakgrunden vid inläsning av sidan
window.onload = function() {
    createStars();
}

// Hämtar API-nyckel från server

async function getApiKey(){
    try { 
        const response = await fetch ('https://corsproxy.io/?https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/key', {
            method: 'GET'
    
        });

        const data = await response.json();
        console.log(data);
        return data.key;
    }


    catch (error){
        console.log('Error fetching API key:', error);
        showErrorMessage('failed to fetch API key.');
        return null;
    }
}

// Hämtar planetdata från API

async function getPlanetBodies(){

    const apiKey = await getApiKey();
    if (!apiKey) return null;
    

try {
    const response = await fetch('https://corsproxy.io/?https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/bodies?errorcode=true', {
        method: 'GET',
        headers: {'x-zocom': apiKey}
        
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
    }     

        catch (error){
        console.log('Error fetching planet bodies:', error);
        showErrorMessage('Failed to fetch planet bodies. Please try again later.');
        return null;
    }

}

function showErrorMessage(message){
    alert(message);
}

// Visar planetinformation i overlay

async function displayPlanetInformation(planetId) {
    const planetsData = await getPlanetBodies();

    if (!planetsData || !planetsData.bodies) {
        alert("No planets data found.");
         return;
     }

    const planet = planetsData.bodies.find(
         p => p.name.toLowerCase() === planetId.toLowerCase()
    );

     if (!planet) {
       alert("Planet not found.");
       return;
     }

// Uppdaterar information i overlay

document.getElementById("planetName").innerText = planet.name;
document.getElementById("planetLatinName").innerText = planet.latinName;

const planetInformation = document.getElementById("planetInformation");
    planetInformation.innerHTML = `
        <article class="info-item">
            <section class="label">Omkrets</section>
            <section class="value">${planet.circumference} km</section>
        </article>
        <article class="info-item">
            <section class="label">Avstånd från solen</section>
            <section class="value">${planet.distance} km</section>
         </article>
        <article class="info-item">
            <section class="label">Omloppstid</section>
            <section class="value">${planet.orbitalPeriod} dagar</section>
        </article>
        <article class="info-item">
             <section class="label">Temperatur (dag)</section>
             <section class="value">${planet.temp.day}°C</section>
         </article>
        <article class="info-item">
             <section class="label">Temperatur (natt)</section>
              <section class="value">${planet.temp.night}°C</section>
         </article>
         <article class="info-item">
               <section class="label">Månar ${planet.moons.length}</section>
               <section class="value">${planet.moons.length > 0 ? planet.moons.join(', ') : 'Inga månar'}</section>
          </article>
         <article class="info-item description">
               <section class="label">Beskrivning</section>
               <section class="value">${planet.desc}</section>
         </article>
     `;
}

// Hanterar klick på planeter

document.querySelectorAll(".planet").forEach(planet => {
  planet.addEventListener("click", () => {
    const planetId = planet.dataset.planet;
    console.log(`You clicked on planet with ID: ${planetId}`)
    displayPlanetInformation(planetId);

    document.getElementById("overlay").style.display = "flex";
  });

});

// Stänger overlay

document.getElementById("closeButton").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
}) 

document.getElementById("overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        document.getElementById("overlay").style.display = "none";
    }
})

// Skapar stjärnor i bakgrunden

function createStars(){
    const starContainer = document.getElementById('star');
    for (let i = 0; i <100; i++){
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starContainer.appendChild(star);
    }
}