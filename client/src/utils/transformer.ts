import { getDaysInCurrentMonth } from "./dates";

const daysOfCurrentMonth = getDaysInCurrentMonth()
const nullArraysByDay = new Array(daysOfCurrentMonth).fill(null)

export const transformFetchedEmployee = (employee: any) => {
  const days = [...nullArraysByDay];
  employee.timesheet.forEach((t: any) => {
    days[new Date(t.createdAt).getDate() - 1] = t; // t.status
  })
  employee.timesheet = days;

  return employee;
}