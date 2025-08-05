const display = document.getElementById('display');

// Append input to display
function append(char) {
  display.value += char;
}

// Clear entire display
function clearDisplay() {
  display.value = '';
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate the expression
function calculate() {
  try {
    display.value = eval(display.value.replace('%', '/100'));
  } catch {
    display.value = 'Error';
  }
}

// Copy result to clipboard
function copyResult() {
  if (display.value !== '') {
    navigator.clipboard.writeText(display.value);
    alert("Copied: " + display.value);
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%', '(', ')'].includes(key)) {
    append(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
