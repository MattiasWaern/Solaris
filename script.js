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

    const planetInformation = document.getElementById("planetInformation");
    planetInformation.innerText = `

        Name: ${planet.name}, 
        Latin Name: ${planet.latinName},
        Circumference: ${planet.circumference} km, 
        Orbital Period: ${planet.orbitalPeriod},
        Description: ${planet.desc},
        Moons: ${planet.moons.length},
        Type: ${planet.type},
        Distance from Sun: ${planet.distance} km,
        Temperature in Day: ${planet.temp.day} C,
        Temperature in Night: ${planet.temp.night} C
    `;
}

document.querySelectorAll(".planet").forEach(planet => {
  planet.addEventListener("click", () => {
    const planetId = planet.dataset.planet;
    console.log(`You clicked on planet with ID: ${planetId}`)
    displayPlanetInformation(planetId);

    InformationBox.style.display = 'block';
  });

});

console.log("JS FILEN KÖRS");

