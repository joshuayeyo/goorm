export function createSpreadsheet(rows, cols) {
  const table = document.createElement('table');
  table.id = 'sheet';

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');

  headRow.appendChild(document.createElement('th'));

  for (let c = 0; c < cols; c++) {
    const th = document.createElement('th');
    th.textContent = String.fromCharCode(65 + c); 
    headRow.appendChild(th);
  }
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  for (let r = 0; r < rows; r++) {
    const row = document.createElement('tr');

    const rowHeader = document.createElement('th');
    rowHeader.textContent = r + 1;
    row.appendChild(rowHeader);

    for (let c = 0; c < cols; c++) {
      const td = document.createElement('td');
      td.contentEditable = true;
      row.appendChild(td);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  return table;
}

export function setupHighlight(table) {
  table.addEventListener('click', (e) => {
    if (e.target.tagName === 'TD') {
      const cell = e.target;
      const colIndex = cell.cellIndex;
      const rowIndex = cell.parentElement.rowIndex;

      table.querySelectorAll('th').forEach(th => th.classList.remove('highlight'));

      table.rows[0].cells[colIndex].classList.add('highlight');

      table.rows[rowIndex].cells[0].classList.add('highlight');
    }
  });
}

export function enableKeyboardNavigation(table) {
  let currentCell = null;

  table.addEventListener('click', (e) => {
    if (e.target.tagName === 'TD') {
      currentCell = e.target;
    }
  });

  table.addEventListener('keydown', (e) => {
    if (!currentCell) return;

    const row = currentCell.parentElement;
    const rowIndex = row.rowIndex;
    const colIndex = currentCell.cellIndex;

    let targetCell = null;

    switch (e.key) {
      case 'ArrowUp':
        if (rowIndex > 1) {
          targetCell = table.rows[rowIndex - 1].cells[colIndex];
        }
        break;
      case 'ArrowDown':
        if (rowIndex < table.rows.length - 1) {
          targetCell = table.rows[rowIndex + 1].cells[colIndex];
        }
        break;
      case 'ArrowLeft':
        if (colIndex > 1) {
          targetCell = row.cells[colIndex - 1];
        }
        break;
      case 'ArrowRight':
        if (colIndex < row.cells.length - 1) {
          targetCell = row.cells[colIndex + 1];
        }
        break;
      default:
        return;
    }

    if (targetCell) {
      e.preventDefault();
      targetCell.focus();
      currentCell = targetCell;

      table.querySelectorAll('th').forEach(th => th.classList.remove('highlight'));
      table.rows[0].cells[currentCell.cellIndex].classList.add('highlight');
      table.rows[currentCell.parentElement.rowIndex].cells[0].classList.add('highlight');
    }
  });
}