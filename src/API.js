const API_URL = 'http://localhost:5000';
async function listInitialData() {
    console.log("inside fech func");
    const response = await fetch(`${API_URL}/getTypes`);
    console.log("response", response);
    return response.json();
}

export default listInitialData;