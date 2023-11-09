


export async function getEvents() {
  const response = await fetch('http://localhost:3000/api/search?isVerified=true')

  if (!response.ok) {
    throw new Error('failed to fetch events')
  }

  return await response.json()
}

export async function getSearch(query) {
    const response = await fetch(`http://localhost:3000/api/search?searchQuery=${query}`,
    {
      method: "GET",
    }
    );
  
    if (!response.ok) {
      throw new Error('Failed to search events');
    }
  
    return await response.json();
  }
  
  export async function getCategory(page, limit, category,sort, order) {
    // Define the URL and query parameters
    const apiUrl = 'http://localhost:3000/api/createevent'; // Replace with the actual API endpoint URL
    const queryParams = new URLSearchParams({
      page: page, // Replace with the desired page number
      limit: limit, // Replace with the desired limit
      category: category, // Replace with the desired category
      sort: sort, // Replace with the desired sorting field
      order: 'asc', // Replace with the desired sorting order
    });
  
    const fullUrl = `${apiUrl}?${queryParams.toString()}`;
  
    try {
      // Make the GET request and await the response
      const response = await fetch(fullUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse and return the response data
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error so it can be handled by the caller
    }
  }
  
