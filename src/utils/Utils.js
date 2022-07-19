const Utlis = () => {};

/**
 * Round the specified number to the specified number of digits after the decimal point
 * @param {Number} number Number for round
 * @param {Integer} decimalPlaces number of digits after the decimal point
 * @returns Rounded noumber
 */
export function roundNumber(number, decimalPlaces) {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen;
}

/**
 *
 * @param {jsClasses} from From what class massage come
 * @param {String} msg Message
 * @param {Object} obj Object to show
 * @param {Boolean} visibility visibility of message
 */
export function log(jsClass, msg, obj, visibility) {
  if (visibility) console.log("[" + jsClass + "]", msg + ": ", obj);
}

/**
 * Enum (should) contains all JS Classes from project, List for console log messages
 */
export const jsClasses = {
  TsecReinfApi: "TsecReinfApi",
};

export default Utlis;
