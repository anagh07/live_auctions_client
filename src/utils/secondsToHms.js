export function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h.toString() === '1' ? ' hour, ' : ' hours, ') : '';
  var mDisplay = m > 0 ? m + (m.toString() === '1' ? ' minute, ' : ' minutes, ') : '';
  var sDisplay = s > 0 ? s + (s.toString() === '1' ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
}

export function secondsToHmsShort(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + 'h ' : '';
  var mDisplay = m > 0 ? m + 'm ' : '';
  var sDisplay = s > 0 ? s + 's' : '';
  return hDisplay + mDisplay + sDisplay;
}
