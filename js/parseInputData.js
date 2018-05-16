export default (inputData, pattern) => {
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
