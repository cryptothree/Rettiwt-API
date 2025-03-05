export function convertRotationToMatrix1(rotation: number) {
	let rad = (rotation * Math.PI) / 180;

	return [Math.cos(rad), -Math.sin(rad), Math.sin(rad), Math.cos(rad)];
}
