export function setupExport(table) {
  document.getElementById('exportBtn').addEventListener('click', () => {
    const data = [];

    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const rowData = [];
      const cells = row.querySelectorAll('td');
      cells.forEach(cell => rowData.push(cell.innerText));
      data.push(rowData);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, 'spreadsheet.xlsx');
  });
}