export default class Utils {
    /**
     * A Linear Interpolation Method, mostly used by Phaser.Tween.
     *
     * @method Phaser.Math#linearInterpolation
     * @param {Array} arr - The input array of values to interpolate between.
     * @param {number} value - The percentage of interpolation, between 0 and 1.
     * @return {number} The interpolated value
     */
    static linearInterpolation(arr, value) {
        const m = arr.length - 1;
        const f = m * value;
        const i = Math.floor(f);

        if (value < 0) {
            return this.linear(arr[0], arr[1], f);
        }

        if (value > 1) {
            return this.linear(arr[m], arr[m - 1], m - f);
        }

        return this.linear(arr[i], arr[i + 1 > m ? m : i + 1], f - i);
    }

    /**
     * Calculates a linear (interpolation) value over t.
     *
     * @method Phaser.Math#linear
     * @param {number} p0
     * @param {number} p1
     * @param {number} t - A value between 0 and 1.
     * @return {number}
     */
    static linear(p0, p1, t) {
        return (p1 - p0) * t + p0;
    }

    /**
     * A Linear Interpolation Method, mostly used by Phaser.Tween.
     *
     * @method Phaser.Math#linearInterpolation
     * @param {Array} arr - The input array of values to interpolate between.
     * @param {number} value - The percentage of interpolation, between 0 and 1.
     * @return {number} The interpolated value
     */
    static linearColorInterpolation(arr, value) {
        const m = arr.length - 1;
        const f = m * value;
        const i = Math.floor(f);

        if (value < 0) {
            return this.linearColor(arr[0], arr[1], f);
        }

        if (value > 1) {
            return this.linearColor(arr[m], arr[m - 1], m - f);
        }

        return this.linearColor(arr[i], arr[i + 1 > m ? m : i + 1], f - i);
    }

    /**
     * Calculates a linear (interpolation) value over t.
     *
     * @method Phaser.Math#linear
     * @param {number} p0
     * @param {number} p1
     * @param {number} t - A value between 0 and 1.
     * @return {number}
     */
    static linearColor(p0, p1, t) {
        const r0 = (p0 & 0xff0000) >> 16;
        const r1 = (p1 & 0xff0000) >> 16;
        const g0 = (p0 & 0xff00) >> 8;
        const g1 = (p1 & 0xff00) >> 8;
        const b0 = p0 & 0xff;
        const b1 = p1 & 0xff;
        const r = this.linear(r0, r1, t);
        const g = this.linear(g0, g1, t);
        const b = this.linear(b0, b1, t);
        return (r << 16) | (g << 8) | b;
    }
}
