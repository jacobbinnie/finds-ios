export function kFormatter(num: number) {
  if (Math.abs(num) >= 1e6) {
    return (Math.sign(num) * (Math.abs(num) / 1e6)).toFixed(1) + "M";
  } else if (Math.abs(num) > 999) {
    return (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "k";
  } else {
    return Math.sign(num) * Math.abs(num);
  }
}
