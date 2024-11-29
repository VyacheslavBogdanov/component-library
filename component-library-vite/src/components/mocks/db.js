const people = [
	'Смирнов А.В.',
	'Иванов Д.С.',
	'Кузнецов Е.М.',
	'Попов Н.А.',
	'Лебедев И.П.',
	'Козлов В.Н.',
	'Новиков А.Д.',
	'Морозов С.А.',
	'Петров Е.В.',
	'Васильев А.С.',
	'Соколов В.И.',
	'Михайлов О.В.',
	'Фёдоров Д.Л.',
	'Орлов И.К.',
	'Волков А.А.',
	'Андреев П.С.',
	'Никитин О.В.',
	'Захаров А.И.',
	'Куликов Д.П.',
	'Александров С.В.',
	'Дмитриев В.Н.',
	'Ковалёв Е.М.',
	'Ситников Л.П.',
	'Григорьев В.Д.',
	'Гордеев А.С.',
	'Антонов И.Н.',
	'Ефимов В.П.',
	'Тимофеев Д.В.',
	'Филиппов Е.С.',
	'Макаров О.А.',
	'Сидоров В.Д.',
	'Чернов И.П.',
	'Савельев Н.В.',
	'Павлов А.С.',
	'Богданов С.К.',
	'Мартынов Е.В.',
	'Воробьёв А.М.',
	'Антипов Д.А.',
	'Тарасов В.О.',
	'Беляев Л.В.',
	'Комаров И.С.',
	'Мельников Е.К.',
	'Шевченко С.В.',
	'Емельянов О.П.',
	'Князев В.А.',
	'Белов Е.И.',
	'Щербаков С.Д.',
	'Назаров Д.В.',
	'Кочетов О.С.',
	'Афанасьев Н.А.',
];


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

const years = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i);

const calendarHeaderItem = [
	{
		type: 'month',
		typesArr: months,
	},
	{
		type: 'year',
		typesArr: years,
	},
];

const messageTypes = [
	{ class: 'inform--success', message: 'This is a SUCCESS message' },
	{ class: 'inform--warning', message: 'This is a WARNING message' },
	{ class: 'inform--error', message: 'This is an ERROR message' },
	{ class: 'inform--info', message: ' This is an INFO message' },
	{ class: 'inform--default', message: ' This is a message' },
];

const mockAPI = (endpoint) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (endpoint === '/people') {
				resolve(people);
			} else if (endpoint === '/calendar-header-item') {
				resolve(calendarHeaderItem);
			} else if (endpoint === '/days-names') {
				resolve(daysNames);
			} else if (endpoint === '/message-types') {
				resolve(messageTypes);
			} else {
				reject({ error: 'Not Found', status: 404 });
			}
		}, 500);
	});
};

export const fetchData = async (endpoint) => {
	try {
		return await mockAPI(endpoint);
	} catch (error) {
		console.error(`Error fetching data from ${endpoint}:`, error);
		throw error;
	}
};
