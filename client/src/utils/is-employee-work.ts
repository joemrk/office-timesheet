const workStatuses = new Set(['PRESENT', 'LATENESS', 'OVERTIME', 'REMOTE'])

export const isEmployeeWork = (status: string): boolean =>{
  return Boolean(status) && workStatuses.has(status)
}