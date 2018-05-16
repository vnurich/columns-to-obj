import parseInputData from './parseInputData';
import patternsList from './patternsList';
import updateData from './updateData';

window.onload = () => {
  // Selector
  const selectPattern = document.getElementById('main-pattern');
  // Source textarea
  const input = document.getElementById('main-input');
  // Result textarea
  const output = document.getElementById('main-output');
  // Default pattern
  let pattern = patternsList.js;
  // Update on first load
  updateData(parseInputData, input, output, pattern);
  // On select option
  selectPattern.onchange = function() {
    pattern = patternsList[this.options[this.selectedIndex].getAttribute('data-pattern')];
    updateData(parseInputData, input, output, pattern);
  }
  // Copy-paste auto from excel
	input.oninput = () => {
    updateData(parseInputData, input, output, pattern);
  }

}
