export function formatDate(dateString: string) {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);

    const date = new Date(year, month - 1, day);

    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ];

    const diaSemana = dias[date.getDay()];
    const mesNome = meses[month - 1];

    return `${diaSemana}, ${day} de ${mesNome} de ${year} às ${timePart}`;
}
