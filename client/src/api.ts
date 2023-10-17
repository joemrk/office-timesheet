export const fetchEmployee = (): Promise<Array<Record<string, any>>> => {
  return fetch('http://localhost:3000/employee')
    .then(r => r.json())
    .then(d => d)
}

// get info by employee

// create employee

// update day