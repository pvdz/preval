# Preval test case

# x_op_nan.md

> Normalize > Binary > With > Nan > X op nan
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  x ** NaN,
  x * NaN,
  x / NaN,
  x % NaN,
  x + NaN,
  x - NaN,
  x << NaN,
  x >> NaN,
  x >>> NaN,
  x < NaN,
  x > NaN,
  x <= NaN,
  x >= NaN,
  x == NaN,
  x != NaN,
  x === NaN,
  x !== NaN,
  x & NaN,
  x ^ NaN,
  x | NaN,
];
$(arr);

const arr2 = [
  x in NaN,
  x instanceof NaN,
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
  x ** NaN,
  x * NaN,
  x / NaN,
  x % NaN,
  x + NaN,
  x - NaN,
  x << NaN,
  x >> NaN,
  x >>> NaN,
  x < NaN,
  x > NaN,
  x <= NaN,
  x >= NaN,
  x == NaN,
  x != NaN,
  x === NaN,
  x !== NaN,
  x & NaN,
  x ^ NaN,
  x | NaN,
];
$(arr);
const arr2 = [x in NaN, x instanceof NaN];
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
x * 0;
const tmpArrElement = NaN;
x * 0;
const tmpArrElement$1 = NaN;
x * 0;
const tmpArrElement$3 = NaN;
x * 0;
const tmpArrElement$5 = NaN;
const tmpArrElement$7 = x + NaN;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
x * 0;
const tmpArrElement$17 = false;
x * 0;
const tmpArrElement$19 = false;
x * 0;
const tmpArrElement$21 = false;
x * 0;
const tmpArrElement$23 = false;
x * 0;
const tmpArrElement$25 = false;
x * 0;
const tmpArrElement$27 = true;
const tmpArrElement$29 = false;
const tmpArrElement$31 = true;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
const tmpArrElement$39 = x in NaN;
const tmpArrElement$41 = x instanceof NaN;
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
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = x + NaN;
x ** 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const arr = [
  NaN,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = x in NaN;
const tmpArrElement$41 = x instanceof NaN;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  toString(  ) {
    debugger;
    const b = $( "toString" );
    return b;
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return 100;
  },
};
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const c = a + NaN;
a ** 0;
const d = a << 0;
const e = a >> 0;
const f = a >>> 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const g = a ^ 0;
const h = a | 0;
const i = [ NaN, NaN, NaN, NaN, c, NaN, d, e, f, false, false, false, false, false, true, false, true, 0, g, h ];
$( i );
const j = a in NaN;
const k = a instanceof NaN;
const l = [ j, k ];
$( l );
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
 - 19: [NaN, NaN, NaN, NaN, NaN, NaN, 100, 100, 100, false, false, false, false, false, true, false, true, 0, 100, 100]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in NaN ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
