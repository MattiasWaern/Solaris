async function getPlanetBodies(){
try {
    const response = await fetch('https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/bodies', {
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

document.getElementById("planetButton").addEventListener("click", async () => {
console.log("KNAPPEN KLICKAD");
    const planets = await getPlanetBodies();
    if (planets) {
        console.log("Planets fetched:",planets);
    }
})


console.log("JS FILEN KÖRS");