const Utlis = () => {};

/**
 * Zaokrągla zadaną liczbę do zadanej ilości po przecinku
 * @param {*} number Liczba do zaokrąglenia
 * @param {*} decimalPlaces Miejsca po przecinku
 * @returns Zaokrąglona liczba
 */
export function roundNumber(number, decimalPlaces) {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen;
}

export default Utlis;
