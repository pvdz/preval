# Preval test case

# nan_op_x.md

> Normalize > Binary > With > Infinity > Nan op x
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  Infinity ** x,
  Infinity * x,
  Infinity / x,
  Infinity % x,
  Infinity + x,
  Infinity - x,
  Infinity << x,
  Infinity >> x,
  Infinity >>> x,
  Infinity < x,
  Infinity > x,
  Infinity <= x,
  Infinity >= x,
  Infinity == x,
  Infinity != x,
  Infinity === x,
  Infinity !== x,
  Infinity & x,
  Infinity ^ x,
  Infinity | x,
];
$(arr);

const arr2 = [
  Infinity in x,
  Infinity instanceof x,
];
$(arr2);
`````

## Pre Normal

`````js filename=intro
const x = {
  toString() {
    debugger;
    return $(`toString`);
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const arr = [
  Infinity ** x,
  Infinity * x,
  Infinity / x,
  Infinity % x,
  Infinity + x,
  Infinity - x,
  Infinity << x,
  Infinity >> x,
  Infinity >>> x,
  Infinity < x,
  Infinity > x,
  Infinity <= x,
  Infinity >= x,
  Infinity == x,
  Infinity != x,
  Infinity === x,
  Infinity !== x,
  Infinity & x,
  Infinity ^ x,
  Infinity | x,
];
$(arr);
const arr2 = [Infinity in x, Infinity instanceof x];
$(arr2);
`````

## Normalized

`````js filename=intro
const x = {
  toString() {
    debugger;
    const tmpReturnArg = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement = Infinity ** x;
const tmpArrElement$1 = Infinity * x;
const tmpArrElement$3 = Infinity / x;
const tmpArrElement$5 = Infinity % x;
const tmpArrElement$7 = Infinity + x;
const tmpArrElement$9 = Infinity - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = Infinity < x;
const tmpArrElement$19 = Infinity > x;
const tmpArrElement$21 = Infinity <= x;
const tmpArrElement$23 = Infinity >= x;
const tmpArrElement$25 = Infinity == x;
const tmpArrElement$27 = Infinity != x;
const tmpArrElement$29 = Infinity === x;
const tmpArrElement$31 = Infinity !== x;
const tmpArrElement$33 = 0 & x;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const arr = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = Infinity in x;
const tmpArrElement$41 = Infinity instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output

`````js filename=intro
const x = {
  toString() {
    debugger;
    const tmpReturnArg = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement = Infinity ** x;
const tmpArrElement$1 = Infinity * x;
const tmpArrElement$3 = Infinity / x;
const tmpArrElement$5 = Infinity % x;
const tmpArrElement$7 = Infinity + x;
const tmpArrElement$9 = Infinity - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = Infinity < x;
const tmpArrElement$19 = Infinity > x;
const tmpArrElement$21 = Infinity <= x;
const tmpArrElement$23 = Infinity >= x;
const tmpArrElement$25 = Infinity == x;
const tmpArrElement$27 = Infinity != x;
const tmpArrElement$33 = 0 & x;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const arr = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = Infinity in x;
const tmpArrElement$41 = Infinity instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'valueOf'
 - 2: 'valueOf'
 - 3: 'valueOf'
 - 4: 'valueOf'
 - 5: 'valueOf'
 - 6: 'valueOf'
 - 7: 'valueOf'
 - 8: 'valueOf'
 - 9: 'valueOf'
 - 10: 'valueOf'
 - 11: 'valueOf'
 - 12: 'valueOf'
 - 13: 'valueOf'
 - 14: 'valueOf'
 - 15: 'valueOf'
 - 16: 'valueOf'
 - 17: 'valueOf'
 - 18: 'valueOf'
 - 19: [Infinity, Infinity, Infinity, NaN, Infinity, Infinity, 0, 0, 0, false, true, false, true, false, true, false, true, 0, 100, 100]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
