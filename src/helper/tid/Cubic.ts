export class Cubic {
	public curves: number[] = [];

	public constructor(curves: number[]) {
		this.curves = curves;
	}

	public calculate(a: number, b: number, m: number): number {
		return 3.0 * a * (1 - m) * (1 - m) * m + 3.0 * b * (1 - m) * m * m + m * m * m;
	}

	public getValue(time: number): number {
		let startGradient = 0.0;
		let endGradient = 0.0;
		let start = 0.0;
		let mid = 0.0;
		let end = 1.0;

		if (time <= 0.0) {
			if (this.curves[0] > 0.0) {
				startGradient = this.curves[1] / this.curves[0];
			} else if (this.curves[1] == 0.0 && this.curves[2] > 0.0) {
				startGradient = this.curves[3] / this.curves[2];
			}
			return startGradient * time;
		}

		if (time >= 1.0) {
			if (this.curves[2] < 1.0) {
				endGradient = (this.curves[3] - 1.0) / (this.curves[2] - 1.0);
			} else if (this.curves[2] == 1.0 && this.curves[0] < 1.0) {
				endGradient = (this.curves[1] - 1.0) / (this.curves[0] - 1.0);
			}
			return 1.0 + endGradient * (time - 1.0);
		}

		while (start < end) {
			mid = (start + end) / 2;
			const xEst = this.calculate(this.curves[0], this.curves[2], mid);

			if (Math.abs(time - xEst) < 0.00001) {
				return this.calculate(this.curves[1], this.curves[3], mid);
			}
			if (xEst < time) {
				start = mid;
			} else {
				end = mid;
			}
		}

		return this.calculate(this.curves[1], this.curves[3], mid);
	}
}

/** Usage

const cubic = new Cubic([0.1, 0.2, 0.3, 0.4]);
value = cubic.getValue(0.5);
console.log(value);

 */
