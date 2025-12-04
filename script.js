const InformationBox = document.getElementById('informationBox');

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

            document.getElementById("planetName").innerText = planet.name;
            document.getElementById("planetLatinName").innerText = planet.latinName;

            const planetInformation = document.getElementById("planetInformation");
            planetInformation.innerHTML = `
                <div class="info-item">
                    <div class="label">Omkrets</div>
                    <div class="value">${planet.circumference.toLocaleString('sv-SE')} km</div>
                </div>
                <div class="info-item">
                    <div class="label">Avstånd från solen</div>
                    <div class="value">${planet.distance.toLocaleString('sv-SE')} km</div>
                </div>
                <div class="info-item">
                    <div class="label">Omloppstid</div>
                    <div class="value">${planet.orbitalPeriod.toLocaleString('sv-SE')} dagar</div>
                </div>
                <div class="info-item">
                    <div class="label">Temperatur (dag)</div>
                    <div class="value">${planet.temp.day}°C</div>
                </div>
                <div class="info-item">
                    <div class="label">Temperatur (natt)</div>
                    <div class="value">${planet.temp.night}°C</div>
                </div>
                <div class="info-item">
                    <div class="label">Månar ${planet.moons.length}</div>
                    <div class="value">${planet.moons.length > 0 ? planet.moons.join(', ') : 'Inga månar'}</div>
                </div>
                <div class="info-item description">
                    <div class="label">Beskrivning</div>
                    <div class="value">${planet.desc}</div>
                </div>
            `;
        }

document.querySelectorAll(".planet").forEach(planet => {
  planet.addEventListener("click", () => {
    const planetId = planet.dataset.planet;
    console.log(`You clicked on planet with ID: ${planetId}`)
    displayPlanetInformation(planetId);

    document.getElementById("overlay").style.display = "flex";
  });

});

document.getElementById("closeButton").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
}) 

document.getElementById("overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        document.getElementById("overlay").style.display = "none";
    }
})

console.log("JS FILEN KÖRS");

