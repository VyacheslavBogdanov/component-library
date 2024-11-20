export function debounce<T extends (...args: any[]) => void>(
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
  
	// Проверяем, начинается ли текст с введенной строки
	if (lowerText.startsWith(lowerQuery)) {
	  // Подсвечиваем первую часть
	  parts.push({ text: text.slice(0, query.length), highlighted: true });
	  // Остальную часть оставляем без подсветки
	  parts.push({ text: text.slice(query.length), highlighted: false });
	} else {
	  // Если нет совпадений, возвращаем обычный текст
	  parts.push({ text: text, highlighted: false });
	}
  
	return parts;
  };