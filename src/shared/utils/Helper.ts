export function formatDate(dateString: string) {
    const dateParts = dateString.split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const day = parseInt(dateParts[2], 10);
    const monthIndex = parseInt(dateParts[1], 10) - 1; // Month index starts from 0
    const year = parseInt(dateParts[0], 10);

    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
}