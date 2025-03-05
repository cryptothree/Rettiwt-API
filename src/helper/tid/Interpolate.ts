export function interpolate(fromList: number[], toList: number[], f: number): (number | boolean | undefined)[] {
	if (fromList.length != toList.length) {
		throw new Error(`Mismatched interpolation arguments ${fromList}: ${toList}`);
	}

	let out = [];

	for (let i = 0; i < fromList.length; i++) {
		out.push(interpolateNum(fromList[i], toList[i], f));
	}

	return out;
}

export function interpolateNum(
	fromVal: number | boolean,
	toVal: number | boolean,
	f: number,
): number | boolean | undefined {
	if (typeof fromVal == 'number' && typeof toVal == 'number') {
		return fromVal * (1 - f) + toVal * f;
	}
	if (typeof fromVal == 'boolean' && typeof toVal == 'boolean') {
		return f < 0.5 ? fromVal : toVal;
	}
}
