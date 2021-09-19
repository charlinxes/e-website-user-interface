export default function (category) {
  switch (category) {
    case 'cloth':
      return '服飾';
    case 'food':
      return '食品';
    default:
      return '家居';
  }
}
