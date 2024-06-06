# Preval test case

# x_op_nan.md

> Normalize > Binary > With > Regex > X op nan
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
  x ** /foo/g,
  x * /foo/g,
  x / /foo/g,
  x % /foo/g,
  x + /foo/g,
  x - /foo/g,
  x << /foo/g,
  x >> /foo/g,
  x >>> /foo/g,
  x < /foo/g,
  x > /foo/g,
  x <= /foo/g,
  x >= /foo/g,
  x == /foo/g,
  x != /foo/g,
  x === /foo/g,
  x !== /foo/g,
  x & /foo/g,
  x ^ /foo/g,
  x | /foo/g,
];
$(arr);

const arr2 = [
  x in /foo/g,
  x instanceof /foo/g,
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
  x ** /foo/g,
  x * /foo/g,
  x / /foo/g,
  x % /foo/g,
  x + /foo/g,
  x - /foo/g,
  x << /foo/g,
  x >> /foo/g,
  x >>> /foo/g,
  x < /foo/g,
  x > /foo/g,
  x <= /foo/g,
  x >= /foo/g,
  x == /foo/g,
  x != /foo/g,
  x === /foo/g,
  x !== /foo/g,
  x & /foo/g,
  x ^ /foo/g,
  x | /foo/g,
];
$(arr);
const arr2 = [x in /foo/g, x instanceof /foo/g];
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
const tmpBinBothLhs = x;
const tmpBinBothRhs = /foo/g;
const tmpArrElement = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = /foo/g;
const tmpArrElement$1 = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = /foo/g;
const tmpArrElement$3 = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = /foo/g;
const tmpArrElement$5 = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = /foo/g;
const tmpArrElement$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = /foo/g;
const tmpArrElement$9 = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = /foo/g;
const tmpArrElement$11 = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = /foo/g;
const tmpArrElement$13 = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = /foo/g;
const tmpArrElement$15 = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = /foo/g;
const tmpArrElement$17 = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = /foo/g;
const tmpArrElement$19 = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = /foo/g;
const tmpArrElement$21 = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = /foo/g;
const tmpArrElement$23 = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = /foo/g;
const tmpArrElement$25 = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = /foo/g;
const tmpArrElement$27 = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = /foo/g;
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = /foo/g;
const tmpArrElement$31 = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = /foo/g;
const tmpArrElement$33 = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = /foo/g;
const tmpArrElement$35 = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = /foo/g;
const tmpArrElement$37 = tmpBinBothLhs$37 | tmpBinBothRhs$37;
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
const tmpBinBothLhs$39 = x;
const tmpBinBothRhs$39 = /foo/g;
const tmpArrElement$39 = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = /foo/g;
const tmpArrElement$41 = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
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
const tmpBinBothRhs = /foo/g;
const tmpArrElement = x ** tmpBinBothRhs;
const tmpBinBothRhs$1 = /foo/g;
const tmpArrElement$1 = x * tmpBinBothRhs$1;
const tmpBinBothRhs$3 = /foo/g;
const tmpArrElement$3 = x / tmpBinBothRhs$3;
const tmpBinBothRhs$5 = /foo/g;
const tmpArrElement$5 = x % tmpBinBothRhs$5;
const tmpBinBothRhs$7 = /foo/g;
const tmpArrElement$7 = x + tmpBinBothRhs$7;
const tmpBinBothRhs$9 = /foo/g;
const tmpArrElement$9 = x - tmpBinBothRhs$9;
const tmpBinBothRhs$11 = /foo/g;
const tmpArrElement$11 = x << tmpBinBothRhs$11;
const tmpBinBothRhs$13 = /foo/g;
const tmpArrElement$13 = x >> tmpBinBothRhs$13;
const tmpBinBothRhs$15 = /foo/g;
const tmpArrElement$15 = x >>> tmpBinBothRhs$15;
const tmpBinBothRhs$17 = /foo/g;
const tmpArrElement$17 = x < tmpBinBothRhs$17;
const tmpBinBothRhs$19 = /foo/g;
const tmpArrElement$19 = x > tmpBinBothRhs$19;
const tmpBinBothRhs$21 = /foo/g;
const tmpArrElement$21 = x <= tmpBinBothRhs$21;
const tmpBinBothRhs$23 = /foo/g;
const tmpArrElement$23 = x >= tmpBinBothRhs$23;
const tmpBinBothRhs$33 = /foo/g;
const tmpArrElement$33 = x & tmpBinBothRhs$33;
const tmpBinBothRhs$35 = /foo/g;
const tmpArrElement$35 = x ^ tmpBinBothRhs$35;
const tmpBinBothRhs$37 = /foo/g;
const tmpArrElement$37 = x | tmpBinBothRhs$37;
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
const tmpBinBothRhs$39 = /foo/g;
const tmpArrElement$39 = x in tmpBinBothRhs$39;
const tmpBinBothRhs$41 = /foo/g;
const tmpArrElement$41 = x instanceof tmpBinBothRhs$41;
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
const c = /foo/g;
const d = a ** c;
const e = /foo/g;
const f = a * e;
const g = /foo/g;
const h = a / g;
const i = /foo/g;
const j = a % i;
const k = /foo/g;
const l = a + k;
const m = /foo/g;
const n = a - m;
const o = /foo/g;
const p = a << o;
const q = /foo/g;
const r = a >> q;
const s = /foo/g;
const t = a >>> s;
const u = /foo/g;
const v = a < u;
const w = /foo/g;
const x = a > w;
const y = /foo/g;
const z = a <= y;
const 01 = /foo/g;
const 11 = a >= 01;
const 21 = /foo/g;
const 31 = a & 21;
const 41 = /foo/g;
const 51 = a ^ 41;
const 61 = /foo/g;
const 71 = a | 61;
const 81 = [ d, f, h, j, l, n, p, r, t, v, x, z, 11, false, true, false, true, 31, 51, 71 ];
$( 81 );
const 91 = /foo/g;
const a1 = a in 91;
const b1 = /foo/g;
const c1 = a instanceof b1;
const d1 = [ a1, c1 ];
$( d1 );
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
 - 17: [NaN, NaN, NaN, NaN, '100/foo/g', NaN, 100, 100, 100, false, false, false, false, false, true, false, true, 0, 100, 100]
 - 18: 'toString'
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
