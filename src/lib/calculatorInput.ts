export const INITIAL_DISPLAY_VALUE = "0";

export function appendDigit(currentValue: string, digit: string) {
  if (!/^\d$/.test(digit)) {
    return currentValue;
  }

  if (currentValue === INITIAL_DISPLAY_VALUE) {
    return digit;
  }

  return `${currentValue}${digit}`;
}

export function appendDecimal(currentValue: string) {
  if (currentValue.includes(".")) {
    return currentValue;
  }

  return `${currentValue}.`;
}
