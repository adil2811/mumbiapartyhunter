


export async function getEvents() {
  const response = await fetch('/api/search?isVerified=true')

  if (!response.ok) {
    throw new Error('failed to fetch events')
  }

  return await response.json()
}
export async function getCatTitle() {
  const response = await fetch('/api/cattitle')

  if (!response.ok) {
    throw new Error('failed to fetch events')
  }

  return await response.json()
}

export async function getSearch(query) {
    const response = await fetch(`/api/search/searchQuery=${query}`,
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
console.log('✌️sort --->', sort);
console.log('✌️category --->', category);
console.log('✌️limit --->', limit);
console.log('✌️page --->', page);
    const apiUrl = '/api/createevent'; 
    const queryParams = new URLSearchParams({
      page: page, 
      limit: limit, 
      category: category, 
      sort: sort, 
      order: 'asc', 
    });
  
    const fullUrl = `${apiUrl}?${queryParams.toString()}`;
console.log('✌️fullUrl --->', fullUrl);
  
    try {
      const response = await fetch(fullUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  }
  
