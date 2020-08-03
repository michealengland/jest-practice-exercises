# [Using Matchers](https://jestjs.io/docs/en/using-matchers)

## What is a matcher?

A matcher in Jest is a value or condition that we expect our test to meet. There are various ways matchers can be used, see https://jestjs.io/docs/en/expect#expectvalue for a full list of methods.

**Example of a matcher from lesson 01**
```js
test('lessons-01 adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});
```

## Code Samples
Each test document in this directory represents an example method from https://jestjs.io/docs/en/expect#expectvalue.