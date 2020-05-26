class RestClient {
  constructor() {
    this.baseUrl = 'https://us-central1-recipe-express-backend.cloudfunctions.net/api';
  }

  getRecipes() {
    return fetch(this.baseUrl + '/recipes', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.recipes);
        return data.recipes;
      });
  }

  postRecipe(data) {
    return fetch(this.baseUrl + '/recipe', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  patchRecipe(data) {
    console.log(data);
    return fetch(this.baseUrl + '/recipe/' + data.id, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  deleteRecipe(data) {
    return fetch(this.baseUrl + '/recipe/' + data, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}

export default RestClient;