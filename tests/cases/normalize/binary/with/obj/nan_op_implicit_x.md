# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > Obj > Nan op implicit x
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const arr = [
  {} ** x,
  {} * x,
  {} / x,
  {} % x,
  {} + x,
  {} - x,
  {} << x,
  {} >> x,
  {} >>> x,
  {} < x,
  {} > x,
  {} <= x,
  {} >= x,
  {} == x,
  {} != x,
  {} === x,
  {} !== x,
  {} & x,
  {} ^ x,
  {} | x,
];
$(arr);

const arr2 = [
  {} in x,
  {} instanceof x,
];
$(arr2);
`````

## Pre Normal

`````js filename=intro
const arr = [
  {} ** x,
  {} * x,
  {} / x,
  {} % x,
  {} + x,
  {} - x,
  {} << x,
  {} >> x,
  {} >>> x,
  {} < x,
  {} > x,
  {} <= x,
  {} >= x,
  {} == x,
  {} != x,
  {} === x,
  {} !== x,
  {} & x,
  {} ^ x,
  {} | x,
];
$(arr);
const arr2 = [{} in x, {} instanceof x];
$(arr2);
`````

## Normalized

`````js filename=intro
const tmpBinLhs = {};
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = {};
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = {};
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = {};
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = {};
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = {};
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = {};
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = {};
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = {};
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = {};
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = {};
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = {};
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = {};
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = {};
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = {};
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = {};
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = {};
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = {};
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = {};
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = {};
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
const tmpBinLhs$39 = {};
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = {};
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output

`````js filename=intro
const tmpBinLhs = {};
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = {};
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = {};
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = {};
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = {};
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = {};
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = {};
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = {};
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = {};
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = {};
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = {};
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = {};
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = {};
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = {};
const tmpArrElement$25 = tmpBinLhs$25 === x;
const tmpBinLhs$27 = {};
const tmpArrElement$27 = tmpBinLhs$27 !== x;
const tmpBinLhs$29 = {};
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = {};
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = {};
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = {};
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = {};
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
const tmpBinLhs$39 = {};
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = {};
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = a ** x;
const c = {};
const d = c * x;
const e = {};
const f = e / x;
const g = {};
const h = g % x;
const i = {};
const j = i + x;
const k = {};
const l = k - x;
const m = {};
const n = m << x;
const o = {};
const p = o >> x;
const q = {};
const r = q >>> x;
const s = {};
const t = s < x;
const u = {};
const v = u > x;
const w = {};
const x = w <= x;
const y = {};
const z = y >= x;
const 01 = {};
const 11 = 01 === x;
const 21 = {};
const 31 = 21 !== x;
const 41 = {};
const 51 = 41 === x;
const 61 = {};
const 71 = 61 !== x;
const 81 = {};
const 91 = 81 & x;
const a1 = {};
const b1 = a1 ^ x;
const c1 = {};
const d1 = c1 | x;
const e1 = [ b, d, f, h, j, l, n, p, r, t, v, x, z, 11, 31, 51, 71, 91, b1, d1 ];
$( e1 );
const f1 = {};
const g1 = f1 in x;
const h1 = {};
const i1 = h1 instanceof x;
const j1 = [ g1, i1 ];
$( j1 );
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
