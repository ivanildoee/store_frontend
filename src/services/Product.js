export async function getAllProduct() {

    try{
        const response = await fetch('https://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}
