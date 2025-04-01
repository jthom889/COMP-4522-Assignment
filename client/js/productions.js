async function fetchProductions() {
    try {
        const response = await fetch('http://localhost:3000/api/production'); // Replace with your API endpoint
        const productions = await response.json();

        const productionListDiv = document.getElementById('production-list');

        if (Array.isArray(productions)) {
            productions.forEach(prod => {
                const productionDiv = document.createElement('div');
                productionDiv.innerHTML = `
                    <p><strong>ProductionID:</strong> ${prod.ProductionID}</p>
                    <p><strong>PlayID:</strong> ${prod.PlayID}</p>
                    <p><strong>ProducerID:</strong> ${prod.ProducerID}</p>
                    <p><strong>Venue:</strong> ${prod.Venue}</p>
                    <p><strong>Production Date:</strong> ${prod.ProductionDate}</p>
                    
                    <hr>
                `;
                productionListDiv.appendChild(productionDiv);
            });
        } else {
            productionListDiv.innerHTML = "<p>Error: data returned was not an array.</p>";
        }

    } catch (error) {
        console.error('Error fetching productions:', error);
        document.getElementById('productions-list').innerHTML = '<p>Failed to fetch productions.</p>';
    }
}

fetchProductions();