export const handleDropdownClick = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	if (!target.classList.contains('search')) {
		event.preventDefault();
	}
};
