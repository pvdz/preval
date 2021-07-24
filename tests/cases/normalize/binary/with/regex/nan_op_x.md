# Preval test case

# nan_op_x.md

> Normalize > Binary > With > Regex > Nan op x
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
  /foo/g ** x,
  /foo/g * x,
  /foo/g / x,
  /foo/g % x,
  /foo/g + x,
  /foo/g - x,
  /foo/g << x,
  /foo/g >> x,
  /foo/g >>> x,
  /foo/g < x,
  /foo/g > x,
  /foo/g <= x,
  /foo/g >= x,
  /foo/g == x,
  /foo/g != x,
  /foo/g === x,
  /foo/g !== x,
  /foo/g & x,
  /foo/g ^ x,
  /foo/g | x,
];
$(arr);

const arr2 = [
  /foo/g in x,
  /foo/g instanceof x,
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
  /foo/g ** x,
  /foo/g * x,
  /foo/g / x,
  /foo/g % x,
  /foo/g + x,
  /foo/g - x,
  /foo/g << x,
  /foo/g >> x,
  /foo/g >>> x,
  /foo/g < x,
  /foo/g > x,
  /foo/g <= x,
  /foo/g >= x,
  /foo/g == x,
  /foo/g != x,
  /foo/g === x,
  /foo/g !== x,
  /foo/g & x,
  /foo/g ^ x,
  /foo/g | x,
];
$(arr);
const arr2 = [/foo/g in x, /foo/g instanceof x];
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
const tmpBinLhs = /foo/g;
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = /foo/g;
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = /foo/g;
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = /foo/g;
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = /foo/g;
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = /foo/g;
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = /foo/g;
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = /foo/g;
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = /foo/g;
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = /foo/g;
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = /foo/g;
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = /foo/g;
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = /foo/g;
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = /foo/g;
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = /foo/g;
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = /foo/g;
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = /foo/g;
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = /foo/g;
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = /foo/g;
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = /foo/g;
const tmpArrElement$37 = tmpBinLhs$37 | x;
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
const tmpBinLhs$39 = /foo/g;
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = /foo/g;
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
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
const tmpBinLhs = /foo/g;
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = /foo/g;
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = /foo/g;
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = /foo/g;
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpStringConcatL = $coerce(x, `plustr`);
const tmpArrElement$7 = `/foo/g${tmpStringConcatL}`;
const tmpBinLhs$9 = /foo/g;
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = /foo/g;
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = /foo/g;
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = /foo/g;
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = /foo/g;
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = /foo/g;
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = /foo/g;
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = /foo/g;
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$33 = /foo/g;
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = /foo/g;
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = /foo/g;
const tmpArrElement$37 = tmpBinLhs$37 | x;
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
  false,
  true,
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinLhs$39 = /foo/g;
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = /foo/g;
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
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
 - 17: [NaN, NaN, NaN, NaN, '/foo/g100', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 100, 100]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
