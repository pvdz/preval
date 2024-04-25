# Preval test case

# x_op_nan.md

> Normalize > Binary > With > False > X op nan
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
  x ** false,
  x * false,
  x / false,
  x % false,
  x + false,
  x - false,
  x << false,
  x >> false,
  x >>> false,
  x < false,
  x > false,
  x <= false,
  x >= false,
  x == false,
  x != false,
  x === false,
  x !== false,
  x & false,
  x ^ false,
  x | false,
];
$(arr);

const arr2 = [
  x in false,
  x instanceof false,
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
  x ** false,
  x * false,
  x / false,
  x % false,
  x + false,
  x - false,
  x << false,
  x >> false,
  x >>> false,
  x < false,
  x > false,
  x <= false,
  x >= false,
  x == false,
  x != false,
  x === false,
  x !== false,
  x & false,
  x ^ false,
  x | false,
];
$(arr);
const arr2 = [x in false, x instanceof false];
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
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + false;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < false;
const tmpArrElement$19 = x > false;
const tmpArrElement$21 = x <= false;
const tmpArrElement$23 = x >= false;
const tmpArrElement$25 = x == false;
const tmpArrElement$27 = x != false;
const tmpArrElement$29 = x === false;
const tmpArrElement$31 = x !== false;
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
const tmpArrElement$39 = x in false;
const tmpArrElement$41 = x instanceof false;
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
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + false;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < false;
const tmpArrElement$19 = x > false;
const tmpArrElement$21 = x <= false;
const tmpArrElement$23 = x >= false;
const tmpArrElement$25 = x == false;
const tmpArrElement$27 = x != false;
x ** 0;
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
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = x in false;
const tmpArrElement$41 = x instanceof false;
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
const c = a ** 0;
const d = a * 0;
const e = a / 0;
const f = a % 0;
const g = a + false;
const h = a - 0;
const i = a << 0;
const j = a >> 0;
const k = a >>> 0;
const l = a < false;
const m = a > false;
const n = a <= false;
const o = a >= false;
const p = a == false;
const q = a != false;
a ** 0;
const r = a ^ 0;
const s = a | 0;
const t = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, 0, r, s ];
$( t );
const u = a in false;
const v = a instanceof false;
const w = [ u, v ];
$( w );
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
 - 19: [1, 0, Infinity, NaN, 100, 100, 100, 100, 100, false, true, false, true, false, true, false, true, 0, 100, 100]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in false ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
