/* Current Date / Time */
import { DateTime } from './luxon.js';

const currentDate = document.getElementById('current-date');
const time = () => {
  const now = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  currentDate.innerHTML = now;
  setInterval(time, 1000);
};
time();
export default time;