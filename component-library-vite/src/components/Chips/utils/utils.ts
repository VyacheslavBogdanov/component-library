export const handleDropdownClick = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	if (!target.classList.contains('search')) {
		event.preventDefault();
	}
};

export function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	return function (...args: any[]) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
}
