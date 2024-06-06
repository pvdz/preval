# Preval test case

# x_op_nan.md

> Normalize > Binary > With > Arr > X op nan
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
  x ** [],
  x * [],
  x / [],
  x % [],
  x + [],
  x - [],
  x << [],
  x >> [],
  x >>> [],
  x < [],
  x > [],
  x <= [],
  x >= [],
  x == [],
  x != [],
  x === [],
  x !== [],
  x & [],
  x ^ [],
  x | [],
];
$(arr);

const arr2 = [
  x in [],
  x instanceof [],
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
  x ** [],
  x * [],
  x / [],
  x % [],
  x + [],
  x - [],
  x << [],
  x >> [],
  x >>> [],
  x < [],
  x > [],
  x <= [],
  x >= [],
  x == [],
  x != [],
  x === [],
  x !== [],
  x & [],
  x ^ [],
  x | [],
];
$(arr);
const arr2 = [x in [], x instanceof []];
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
const tmpBinBothRhs = [];
const tmpArrElement = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = [];
const tmpArrElement$1 = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = [];
const tmpArrElement$3 = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = [];
const tmpArrElement$5 = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = [];
const tmpArrElement$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = [];
const tmpArrElement$9 = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = [];
const tmpArrElement$11 = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = [];
const tmpArrElement$13 = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = [];
const tmpArrElement$15 = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = [];
const tmpArrElement$17 = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = [];
const tmpArrElement$19 = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = [];
const tmpArrElement$21 = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = [];
const tmpArrElement$23 = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = [];
const tmpArrElement$25 = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = [];
const tmpArrElement$27 = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = [];
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = [];
const tmpArrElement$31 = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = [];
const tmpArrElement$33 = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = [];
const tmpArrElement$35 = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = [];
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
const tmpBinBothRhs$39 = [];
const tmpArrElement$39 = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = [];
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
const tmpBinBothRhs = [];
const tmpArrElement = x ** tmpBinBothRhs;
const tmpBinBothRhs$1 = [];
const tmpArrElement$1 = x * tmpBinBothRhs$1;
const tmpBinBothRhs$3 = [];
const tmpArrElement$3 = x / tmpBinBothRhs$3;
const tmpBinBothRhs$5 = [];
const tmpArrElement$5 = x % tmpBinBothRhs$5;
const tmpArrElement$7 = $coerce(x, `plustr`);
const tmpBinBothRhs$9 = [];
const tmpArrElement$9 = x - tmpBinBothRhs$9;
const tmpBinBothRhs$11 = [];
const tmpArrElement$11 = x << tmpBinBothRhs$11;
const tmpBinBothRhs$13 = [];
const tmpArrElement$13 = x >> tmpBinBothRhs$13;
const tmpBinBothRhs$15 = [];
const tmpArrElement$15 = x >>> tmpBinBothRhs$15;
const tmpBinBothRhs$17 = [];
const tmpArrElement$17 = x < tmpBinBothRhs$17;
const tmpBinBothRhs$19 = [];
const tmpArrElement$19 = x > tmpBinBothRhs$19;
const tmpBinBothRhs$21 = [];
const tmpArrElement$21 = x <= tmpBinBothRhs$21;
const tmpBinBothRhs$23 = [];
const tmpArrElement$23 = x >= tmpBinBothRhs$23;
const tmpBinBothRhs$33 = [];
const tmpArrElement$33 = x & tmpBinBothRhs$33;
const tmpBinBothRhs$35 = [];
const tmpArrElement$35 = x ^ tmpBinBothRhs$35;
const tmpBinBothRhs$37 = [];
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
const tmpBinBothRhs$39 = [];
const tmpArrElement$39 = x in tmpBinBothRhs$39;
const tmpBinBothRhs$41 = [];
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
const c = [];
const d = a ** c;
const e = [];
const f = a * e;
const g = [];
const h = a / g;
const i = [];
const j = a % i;
const k = $coerce( a, "plustr" );
const l = [];
const m = a - l;
const n = [];
const o = a << n;
const p = [];
const q = a >> p;
const r = [];
const s = a >>> r;
const t = [];
const u = a < t;
const v = [];
const w = a > v;
const x = [];
const y = a <= x;
const z = [];
const 01 = a >= z;
const 11 = [];
const 21 = a & 11;
const 31 = [];
const 41 = a ^ 31;
const 51 = [];
const 61 = a | 51;
const 71 = [ d, f, h, j, k, m, o, q, s, u, w, y, 01, false, true, false, true, 21, 41, 61 ];
$( 71 );
const 81 = [];
const 91 = a in 81;
const a1 = [];
const b1 = a instanceof a1;
const c1 = [ 91, b1 ];
$( c1 );
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
 - 17: [1, 0, Infinity, NaN, '100', 100, 100, 100, 100, false, true, false, true, false, true, false, true, 0, 100, 100]
 - 18: 'toString'
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
