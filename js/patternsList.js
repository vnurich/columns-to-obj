export default {
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
