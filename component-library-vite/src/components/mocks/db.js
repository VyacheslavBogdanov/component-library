const PORT = 3003;




const months = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

const daysNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const mockAPI = (endpoint) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (endpoint === '/people') {
				resolve(people);
			} else if (endpoint === '/months') {
				resolve(months);
			} else if (endpoint === '/days-names') {
				resolve(daysNames);
			} else {
				reject({ error: 'Not Found', status: 404 });
			}
		}, 500);
	});
};

export const fetchData = async (endpoint) => {
	try {
		const data = await mockAPI(endpoint);
		return data;
	} catch (error) {
		console.error(`Error fetching data from ${endpoint}:`, error);
		throw error;
	}
};
