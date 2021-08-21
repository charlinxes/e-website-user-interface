export default function (date) {
  const time = new Date(date * 1000);
  function addZero(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }
  if (time.getDate()) {
    const y = time.getFullYear();
    const m = addZero(time.getMonth() + 1);
    const d = addZero(time.getDate());
    return `${y}-${m}-${d}`;
  }
  return '';
}
