export function round(value: number, decimal: number = 0) {
	decimal = Math.pow(10, decimal);
	return Math.round(value*decimal) / decimal;
}