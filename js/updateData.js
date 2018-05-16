export default (parse, input, output, pattern) => {
  let inputData = input.value.split('\n');
  output.value = parse(inputData, pattern);
}
