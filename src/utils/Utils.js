const Utlis = () => {};

/**
 * Round the specified number to the specified number of digits after the decimal point
 * @param {*} number Number for round
 * @param {*} decimalPlaces number of digits after the decimal point
 * @returns Rounded noumber
 */
export function roundNumber(number, decimalPlaces) {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen;
}

export default Utlis;
