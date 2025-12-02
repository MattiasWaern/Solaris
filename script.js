const planetName = document.getElementById("planet-name")
const planetInfo = document.getElementById("planet-info")

async function getApiKey(){
    try { 
        const respone = await fetch ('https://corsproxy.io/?https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/apikey', {
            method: 'GET'
    
        });
    }
    catch (error){
        console.log('Error fetching API key:', error);
        showErrorMessage('failed to fetch API key.');
        return null;
    }
}


async function getPlanetBodies(){
try {
    const response = await fetch('https://corsproxy.io/?https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',
        headers: {'x-zocom': 'solaris-NKsTcw3OPrMQPoSz'}
        
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

/*
async function displayPlanets() {
    const apiKey = 'solaris-NKsTcw3OPrMQPoSz';
    const planets = await getPlanetBodies(apiKey);

    if (!planets || !planets.bodies) {
        alert("No planets data found.");
        return;
    }

    const container = document.getElementById("planetInfo");
    container.innerHTML = "";

    planets.bodies.forEach(planet => {
        const planetInfo = document.createElement("p");
        planetInfo.innerText = `Name: ${planet.name}, Circumference: ${planet.circumference} km, orbitalPeriod: ${planet.orbitalPeriod}`;
        container.appendChild(planetInfo);
    });
}
*/

async function displayPlanetInformation(planetId) {
    const apiKey = 'solaris-NKsTcw3OPrMQPoSz';
    const planetsData = await getPlanetBodies(apiKey);

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

    const planetInformation = document.getElementById("planetInformation");
    planetInformation.innerText = `

        Name: ${planet.name}, 
        Latin Name: ${planet.latinName},
        Circumference: ${planet.circumference} km, 
        Orbital Period: ${planet.orbitalPeriod},
        Type: ${planet.type}
    `;
}

document.querySelectorAll(".planet").forEach(planet => {
  planet.addEventListener("click", () => {
    const planetId = planet.dataset.planet;
    console.log(`You clicked on planet with ID: ${planetId}`)
    displayPlanetInformation(planetId);
  });

});

console.log("JS FILEN KÖRS");

