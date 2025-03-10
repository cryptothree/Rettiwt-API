export function convertRotationToMatrix1(rotation: number): [number, number, number, number] {
	const rad = (rotation * Math.PI) / 180;

	return [Math.cos(rad), -Math.sin(rad), Math.sin(rad), Math.cos(rad)];
}
