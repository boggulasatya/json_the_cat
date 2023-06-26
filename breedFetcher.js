const request = require('request');

const fetchBreedInfo = function(breed, callback) {
  const apiUrl = 'https://api.thecatapi.com/v1';
  const breedEndpoint = `${apiUrl}/breeds/search?q=${breed}`;
  
  request(breedEndpoint, (error, response, body) => {
    if (error) {
      console.error('Error fetching breed information:', error);
      callback(error, null);
    } else {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        const data = JSON.parse(body);
        if (data.length > 0) {
          callback(null, data);
        } else {
          callback('Breed not found', null);
        }
        //Edge case:Request Failed
      } else {
        console.error('Request failed with status code:', response.statusCode);
        const errorMessage = 'Request failed with status code: ${response.statusCode}';
        callback(errorMessage, null);
      }
    }
  });
};
//Retirve breed name from command-line arguments
const breedName = process.argv[2];

//checking if breed name is provided
if (breedName) {
  fetchBreedInfo(breedName, (error, data) => {
    if (error) {
      console.log('Error', error);
    } else {
      console.log('Breed information:', data);
    }
  });
} else {
  console.log('Please provide a breed name as a command-line argument.');
}
