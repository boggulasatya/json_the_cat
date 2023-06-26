const request = require('request');

const fetchBreedDescription = function(breed, callback) {
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
          const description = data[0].description || '';
          callback(null, description);
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
module.exports = { fetchBreedDescription };
