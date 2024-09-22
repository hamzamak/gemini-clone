// async function runChat(prompt) {
//     // Définir l'URL de l'API
//     const apiUrl = 'http://localhost:8083/api/flows';

//     // Créer l'objet de données à envoyer
//     const requestData = {
//         customerId: "2121",
//         request: prompt
//     };

//     try {
//         // Faire la requête POST
//         const response = await fetch(apiUrl, {
//             method: 'POST', // Méthode HTTP
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestData) // Convertir les données en JSON
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         // Traiter la réponse
//         const responseData = await response.json();
//         console.log('Response:', responseData);
//     } catch (error) {
//         // Gérer les erreurs
//         console.error('Error:', error);
//     }
// }

// export default runChat