# Preval test case

# x_op_nan.md

> Normalize > Binary > With > Constructor > X op nan
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
  x ** String,
  x * String,
  x / String,
  x % String,
  x + String,
  x - String,
  x << String,
  x >> String,
  x >>> String,
  x < String,
  x > String,
  x <= String,
  x >= String,
  x == String,
  x != String,
  x === String,
  x !== String,
  x & String,
  x ^ String,
  x | String,
];
$(arr);

const arr2 = [
  x in String,
  x instanceof String,
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
  x ** String,
  x * String,
  x / String,
  x % String,
  x + String,
  x - String,
  x << String,
  x >> String,
  x >>> String,
  x < String,
  x > String,
  x <= String,
  x >= String,
  x == String,
  x != String,
  x === String,
  x !== String,
  x & String,
  x ^ String,
  x | String,
];
$(arr);
const arr2 = [x in String, x instanceof String];
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
const tmpStringConcatR = $coerce(x, `plustr`);
const tmpArrElement$7 = `${tmpStringConcatR}function String() { [native code] }`;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < `function String() { [native code] }`;
const tmpArrElement$19 = x > `function String() { [native code] }`;
const tmpArrElement$21 = x <= `function String() { [native code] }`;
const tmpArrElement$23 = x >= `function String() { [native code] }`;
const tmpArrElement$25 = x == String;
const tmpArrElement$27 = x != String;
const tmpArrElement$29 = x === String;
const tmpArrElement$31 = x !== String;
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
const tmpArrElement$39 = x in String;
const tmpArrElement$41 = x instanceof String;
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
const tmpStringConcatR = $coerce(x, `plustr`);
const tmpArrElement$7 = `${tmpStringConcatR}function String() { [native code] }`;
x ** 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < `function String() { [native code] }`;
const tmpArrElement$19 = x > `function String() { [native code] }`;
const tmpArrElement$21 = x <= `function String() { [native code] }`;
const tmpArrElement$23 = x >= `function String() { [native code] }`;
const tmpArrElement$25 = x === String;
const tmpArrElement$27 = x !== String;
const tmpArrElement$29 = x === String;
const tmpArrElement$31 = x !== String;
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
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = x in String;
const tmpArrElement$41 = x instanceof String;
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
  },,
valueOf(  ) {
    debugger;
    $( "valueOf" );
    return 100;
  },
;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const c = $coerce( a, "plustr" );
const d = `${[object Object]}function String() { [native code] }`;
a ** 0;
const e = a << 0;
const f = a >> 0;
const g = a >>> 0;
const h = a < "function String() { [native code] }";
const i = a > "function String() { [native code] }";
const j = a <= "function String() { [native code] }";
const k = a >= "function String() { [native code] }";
const l = a === String;
const m = a !== String;
const n = a === String;
const o = a !== String;
a ** 0;
const p = a ^ 0;
const q = a | 0;
const r = [ NaN, NaN, NaN, NaN, d, NaN, e, f, g, h, i, j, k, l, m, n, o, 0, p, q,, ];
$( r );
const s = a in String;
const t = a instanceof String;
const u = [ s, t,, ];
$( u );
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
 - 17: 
  [
    NaN,
    NaN,
    NaN,
    NaN,
    '100function() { [native code] }',
    NaN,
    100,
    100,
    100,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    0,
    100,
    100,
  ],

 - 18: 'toString'
 - 19: [true, false]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
