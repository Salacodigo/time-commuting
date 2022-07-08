


const mydate = new Date(Date.UTC(2020, 1, 26, 15, 0, 0));
 
//Spanish uses day-month-year order and 24-hour time without AM/PM
console.log(mydate.toLocaleString('es-ES', { timeZone: 'UTC' }));