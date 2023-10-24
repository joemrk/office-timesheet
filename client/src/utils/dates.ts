export const  getDaysInCurrentMonth = () => {
  const date = new Date();

  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
}

export const getDateByMonthAndDay = (month: number, day: number) => {
  return new Date(
    new Date().setFullYear(new Date().getFullYear(), month, day)
  )
} 