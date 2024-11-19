// db.d.ts
export declare function fetchData(endpoint: string): Promise<any>;

  
  
  export const people: Person[] = [
    { id: '1', name: 'Смирнов А.В.' },
    { id: '2', name: 'Иванов Д.С.' },
    { id: '3', name: 'Кузнецов Е.М.' },
    { id: '4', name: 'Попов Н.А.' },
    { id: '5', name: 'Лебедев И.П.' },
    { id: '6', name: 'Козлов В.Н.' },
    { id: '7', name: 'Новиков А.Д.' },
    { id: '8', name: 'Морозов С.А.' },
    { id: '9', name: 'Петров Е.В.' },
    { id: '10', name: 'Васильев А.С.' },
    { id: '11', name: 'Соколов В.И.' },
    { id: '12', name: 'Михайлов О.В.' },
    { id: '13', name: 'Фёдоров Д.Л.' },
    { id: '14', name: 'Орлов И.К.' },
    { id: '15', name: 'Волков А.А.' },
    { id: '16', name: 'Андреев П.С.' },
    { id: '17', name: 'Никитин О.В.' },
    { id: '18', name: 'Захаров А.И.' },
    { id: '19', name: 'Куликов Д.П.' },
    { id: '20', name: 'Александров С.В.' },
  ].sort((a, b) => a.name.localeCompare(b.name));