/**
 * Adding a custom matcher.
 *
 * Assume that we have a function that gets used frequently.
 * Rather than import this function many times, we can abstract
 * the function to `expect`. This way we can use a custom function
 * as a matcher.
 *
 * @param {Object, Promise} Matchers should return an object (or a Promise of an object).
 * @link https://jestjs.io/docs/en/expect#custom-matchers-api
 */
expect.extend({
	// Function that we're abstracting.
	// Ex: `expect(100).toBeWithinRange(90, 110)`.
	toBeWithinRange(received, floor, ceiling) {
		// Criteria for what is considered passing.
		const pass = received >= floor && received <= ceiling;

		// We must return two keys which are a `message` string and `pass` boolean.
		if (pass) {
			return {
				message: () => `02-02 expected ${received} not to be within range ${floor} - ${ceiling}`,
				pass: true,
			};
		} else {
			return {
				message: () => `02-02 expected ${received} to be within range ${floor} - ${ceiling}`,
				pass: false,
			};
		}
	},
});

test('02 02-expect.extend - numeric ranges', () => {
	expect(100).toBeWithinRange(90, 110);
	expect(101).not.toBeWithinRange(0, 100);
	expect({apples: 6, bananas: 3}).toEqual({
		apples: expect.toBeWithinRange(1, 10),
		bananas: expect.not.toBeWithinRange(11, 20),
	});
});