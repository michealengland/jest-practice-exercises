const exampleString = (String) => {
	return String;
}

// Check that strings match.
test('expect.value - String match example.', () => {
	expect(exampleString( 'The kitty snores loudly.' )).toBe('The kitty snores loudly.');
});