import { describe, it, expect } from "vitest";

describe("Example Test Suite", () => {
	it("should pass a basic test", () => {
		expect(1 + 1).toBe(2);
	});

	it("should handle string operations", () => {
		const greeting = "Hello, World!";
		expect(greeting).toContain("World");
		expect(greeting.length).toBe(13);
	});

	it("should work with arrays", () => {
		const numbers = [1, 2, 3, 4, 5];
		expect(numbers).toHaveLength(5);
		expect(numbers).toContain(3);
		expect(numbers[0]).toBe(1);
	});

	it("should handle async operations", async () => {
		const promise = Promise.resolve("async result");
		await expect(promise).resolves.toBe("async result");
	});
});
