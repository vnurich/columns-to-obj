:paperclip: Copy-paste Excel columns and convert it to js or php structure (object/array) using premade pattern. *NOTICE:* Tabs between columns (auto generated when copying from excel table) are important.

https://vnurich.github.io/columns-to-obj/

Input data example:
```javascript
// Copy-paste from Excel
1000	5000	4990
1001	600	499
1002	1500	1399
```

Output data example:
```
// JS object
[
  {'1000': {oldPrice: 5000, price: 4990}},
  {'1001': {oldPrice: 600, price: 499}},
  {'1002': {oldPrice: 1500, price: 1399}},
]
// or PHP object
[
  '1000' => [5000, 4990],
  '1001' => [600, 499],
  '1002' => [1500, 1399],
]
```

Pattern structure (see `js/patternList.js`):
```javascript
'patternName': {
    open: () => `[`, // open quote
    structure: [
      (value) => `${value}`,
      //...
    ],
    close: () => `]` // close quote
  },
```

Current structures:
```javascript
// JS array of objects generator
[
  {'column1': {oldPrice: column2, price: column3}} 
]
```

```javascript
// PHP associative array generator
[
  'column1' => [column2, column3] 
]
```
