(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var parseInputData = (inputData, pattern) => {
  let start = true;
  let size = inputData.length;
  let columnValues = Object.keys(pattern).length - 2;
  let countLine = 0;
  let result = ``;

  inputData.map(line => {
    countLine++;
    let lineInputData = line.split('\t');

    if (start) {
      result += pattern.open();
      start = false;
    }
    
    pattern.structure.map((pattern, index) => {
      if (lineInputData[index] !== '' && lineInputData[index] !== undefined) {
        result += pattern(lineInputData[index]);
      }        
    });
    
    if (countLine >= size) {
      result += pattern.close();
      start = true;
      countLine = 0;
    }
  });

  return result;
}

var patternsList = {
  /**
   * [
   *   {'x': {oldPrice: y, price: z}} 
   * ]
   */
  'js': {
    open: () => `[\n`,
    structure: [
      (id) => `\t{'${id}': `,
      (oldPrice) => `{oldPrice: ${oldPrice}, `,
      (price) => `price: ${price}}},\n`,
    ],
    close: () => `]\n`
  },
  /**
   * [
   *   'x' => [y, z]
   * ]
   */
  'php': {
    open: () => `[\n`,
    structure: [
      (id) => `\t'${id}' => `,
      (oldPrice) => `[${oldPrice}, `,
      (price) => `${price}],\n`,
    ],
    close: () => `]\n`
  }
}

var updateData = (parse, input, output, pattern) => {
  let inputData = input.value.split('\n');
  output.value = parse(inputData, pattern);
}

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
  };
  // Copy-paste auto from excel
	input.oninput = () => {
    updateData(parseInputData, input, output, pattern);
  };

};

})));
