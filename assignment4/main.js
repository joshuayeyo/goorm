import { createSpreadsheet, enableKeyboardNavigation, setupHighlight } from './spreadsheet.js';
import { setupExport } from './export.js';

const table = createSpreadsheet(20, 10);
document.getElementById('spreadsheet-container').appendChild(table);

setupHighlight(table);
setupExport(table);
enableKeyboardNavigation(table);