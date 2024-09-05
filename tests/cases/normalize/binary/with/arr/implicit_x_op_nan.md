# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > Arr > Implicit x op nan
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
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
x;
const tmpBinBothRhs = [];
const tmpArrElement = x ** tmpBinBothRhs;
x;
const tmpBinBothRhs$1 = [];
const tmpArrElement$1 = x * tmpBinBothRhs$1;
x;
const tmpBinBothRhs$3 = [];
const tmpArrElement$3 = x / tmpBinBothRhs$3;
x;
const tmpBinBothRhs$5 = [];
const tmpArrElement$5 = x % tmpBinBothRhs$5;
x;
const tmpArrElement$7 = $coerce(x, `plustr`);
x;
const tmpBinBothRhs$9 = [];
const tmpArrElement$9 = x - tmpBinBothRhs$9;
x;
const tmpBinBothRhs$11 = [];
const tmpArrElement$11 = x << tmpBinBothRhs$11;
x;
const tmpBinBothRhs$13 = [];
const tmpArrElement$13 = x >> tmpBinBothRhs$13;
x;
const tmpBinBothRhs$15 = [];
const tmpArrElement$15 = x >>> tmpBinBothRhs$15;
x;
const tmpBinBothRhs$17 = [];
const tmpArrElement$17 = x < tmpBinBothRhs$17;
x;
const tmpBinBothRhs$19 = [];
const tmpArrElement$19 = x > tmpBinBothRhs$19;
x;
const tmpBinBothRhs$21 = [];
const tmpArrElement$21 = x <= tmpBinBothRhs$21;
x;
const tmpBinBothRhs$23 = [];
const tmpArrElement$23 = x >= tmpBinBothRhs$23;
x;
const tmpBinBothRhs$33 = [];
const tmpArrElement$33 = x & tmpBinBothRhs$33;
x;
const tmpBinBothRhs$35 = [];
const tmpArrElement$35 = x ^ tmpBinBothRhs$35;
x;
const tmpBinBothRhs$37 = [];
const tmpArrElement$37 = x | tmpBinBothRhs$37;
const tmpBinBothRhs$25 = [];
const tmpBinBothRhs$27 = [];
const tmpBinBothRhs$29 = [];
const tmpBinBothRhs$31 = [];
const tmpArrElement$25 = x === tmpBinBothRhs$25;
const tmpArrElement$27 = x !== tmpBinBothRhs$27;
const tmpArrElement$29 = x === tmpBinBothRhs$29;
const tmpArrElement$31 = x !== tmpBinBothRhs$31;
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
x;
const tmpBinBothRhs$39 = [];
const tmpBinBothRhs$41 = [];
const tmpArrElement$39 = x in tmpBinBothRhs$39;
const tmpArrElement$41 = x instanceof tmpBinBothRhs$41;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
x;
const a = [];
const b = x ** a;
x;
const c = [];
const d = x * c;
x;
const e = [];
const f = x / e;
x;
const g = [];
const h = x % g;
x;
const i = $coerce( x, "plustr" );
x;
const j = [];
const k = x - j;
x;
const l = [];
const m = x << l;
x;
const n = [];
const o = x >> n;
x;
const p = [];
const q = x >>> p;
x;
const r = [];
const s = x < r;
x;
const t = [];
const u = x > t;
x;
const v = [];
const w = x <= v;
x;
const x = [];
const y = x >= x;
x;
const z = [];
const 01 = x & z;
x;
const 11 = [];
const 21 = x ^ 11;
x;
const 31 = [];
const 41 = x | 31;
const 51 = [];
const 61 = [];
const 71 = [];
const 81 = [];
const 91 = x === 51;
const a1 = x !== 61;
const b1 = x === 71;
const c1 = x !== 81;
const d1 = [ b, d, f, h, i, k, m, o, q, s, u, w, y, 91, a1, b1, c1, 01, 21, 41 ];
$( d1 );
x;
const e1 = [];
const f1 = [];
const g1 = x in e1;
const h1 = x instanceof f1;
const i1 = [ g1, h1 ];
$( i1 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
