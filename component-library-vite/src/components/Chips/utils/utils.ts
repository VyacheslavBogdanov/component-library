export function debounce<T extends (...args: unknown[]) => void>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;

	return function (...args: Parameters<T>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

export const highlightMatch = (text: string, query: string) => {
	const parts = [];
	const lowerText = text.toLowerCase();
	const lowerQuery = query.toLowerCase();

	if (lowerText.startsWith(lowerQuery)) {
		parts.push({ text: text.slice(0, query.length), highlighted: true });
		parts.push({ text: text.slice(query.length), highlighted: false });
	} else {
		parts.push({ text: text, highlighted: false });
	}
	return parts;
};
