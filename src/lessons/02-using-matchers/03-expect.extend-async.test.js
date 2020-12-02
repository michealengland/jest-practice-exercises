// Similar to example 02-02, we're abstracting `toResolveBeforeTimeout`
// as an asynchronous function to verify a value loaded or did not load
// after a set amount of time.

/**
 * Simluar two promises to determine which resolves first.
 *
 * @param {Int} time1
 * @param {Int} time2
 *
 * @returns {Promise} setTimeout that completed first.
 */
const getExternalValueFromRemoteSource = (time1, time2) => {
	// Note: setTimeout does not have a reject feature and is not needed in this case.
	const promise1 = new Promise((resolve, reject) => {
		setTimeout(resolve, time1, 'one');
	});
	const promise2 = new Promise((resolve, reject) => {
		setTimeout(resolve, time2, 'two');
	});

	return Promise.race([promise1, promise2]).then((value) => value);
}

/**
 * Adding an asynchronous custom matcher.
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
	// Async function that we're abstracting.
	// Ex: expect(500).toResolveBeforeTimeout(1000)
	async toResolveBeforeTimeout(received, timeout) {
		const externalValue = await getExternalValueFromRemoteSource(received, timeout);

		const pass = externalValue;

		if (pass === 'one') {
			return {
				message: () => `Value of "${externalValue}" retrieved after ${received} milliseconds.`,
				pass: true,
			};
		} else {
			return {
				message: () => `expected "${received}" to be less than ${externalValue}`,
				pass: false,
			};
		}
	},
});

test('02-03 expect.extend-async fetch before timeout simulation.', async () => {
	await expect(100).toResolveBeforeTimeout(200);
	await expect(400).not.toResolveBeforeTimeout(300);
});