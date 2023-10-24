const API_URL = 'http://localhost:3000'

const headers = { 
  'Content-Type': 'application/json',
  'Accept': 'application/json'
 }

export const fetchEmployee = (): Promise<Array<Record<string, any>>> => {
  return fetch(`${API_URL}/employee`)
    .then(r => r.json())
    .then(d => d)
}

// add employee
export const addEmployee = async (body: any) => {  
  try {
    const response = await fetch(
      `${API_URL}/employee`, 
      { 
        method: 'post', 
        body: JSON.stringify(body),
        headers,
      })      
    return response.json();
  } catch (error: any) {
    console.log('fetch error', error);
  }
}

// update day
export const setTimesheet = async (body: any) => {
  try {
    const response = await fetch(
      `${API_URL}/timesheet`, 
      { 
        method: 'post', 
        body: JSON.stringify(body),
        headers,
      })      
    return response.json();
  } catch (error: any) {
    console.log('fetch error', error);
  }
}

// get info by employee
