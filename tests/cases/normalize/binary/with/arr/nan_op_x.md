# Preval test case

# nan_op_x.md

> Normalize > Binary > With > Arr > Nan op x
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const x = $spy();

const arr = [
  [] ** x,
  [] * x,
  [] / x,
  [] % x,
  [] + x,
  [] - x,
  [] << x,
  [] >> x,
  [] >>> x,
  [] < x,
  [] > x,
  [] <= x,
  [] >= x,
  [] == x,
  [] != x,
  [] === x,
  [] !== x,
  [] & x,
  [] ^ x,
  [] | x,
];
$(arr);

const arr2 = [
  [] in x,
  [] instanceof x,
];
$(arr2);
`````

## Pre Normal

`````js filename=intro
const x = $spy();
const arr = [
  [] ** x,
  [] * x,
  [] / x,
  [] % x,
  [] + x,
  [] - x,
  [] << x,
  [] >> x,
  [] >>> x,
  [] < x,
  [] > x,
  [] <= x,
  [] >= x,
  [] == x,
  [] != x,
  [] === x,
  [] !== x,
  [] & x,
  [] ^ x,
  [] | x,
];
$(arr);
const arr2 = [[] in x, [] instanceof x];
$(arr2);
`````

## Normalized

`````js filename=intro
const x = $spy();
const tmpBinLhs = [];
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = [];
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = [];
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = [];
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = [];
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = [];
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = [];
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = [];
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = [];
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = [];
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = [];
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = [];
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = [];
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = [];
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = [];
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = [];
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = [];
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = [];
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = [];
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = [];
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
const tmpBinLhs$39 = [];
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = [];
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output

`````js filename=intro
const x = $spy();
const tmpBinLhs = [];
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = [];
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = [];
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = [];
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpArrElement$7 = $coerce(x, `plustr`);
const tmpBinLhs$9 = [];
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = [];
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = [];
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = [];
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = [];
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = [];
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = [];
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = [];
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = [];
const tmpArrElement$25 = tmpBinLhs$25 === x;
const tmpBinLhs$27 = [];
const tmpArrElement$27 = tmpBinLhs$27 !== x;
const tmpBinLhs$29 = [];
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = [];
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = [];
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = [];
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = [];
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
const tmpBinLhs$39 = [];
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = [];
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
const b = [];
const c = b ** a;
const d = [];
const e = d * a;
const f = [];
const g = f / a;
const h = [];
const i = h % a;
const j = $coerce( a, "plustr" );
const k = [];
const l = k - a;
const m = [];
const n = m << a;
const o = [];
const p = o >> a;
const q = [];
const r = q >>> a;
const s = [];
const t = s < a;
const u = [];
const v = u > a;
const w = [];
const x = w <= a;
const y = [];
const z = y >= a;
const 01 = [];
const 11 = 01 === a;
const 21 = [];
const 31 = 21 !== a;
const 41 = [];
const 51 = 41 === a;
const 61 = [];
const 71 = 61 !== a;
const 81 = [];
const 91 = 81 & a;
const a1 = [];
const b1 = a1 ^ a;
const c1 = [];
const d1 = c1 | a;
const e1 = [ c, e, g, i, j, l, n, p, r, t, v, x, z, 11, 31, 51, 71, 91, b1, d1,, ];
$( e1 );
const f1 = [];
const g1 = f1 in a;
const h1 = [];
const i1 = h1 instanceof a;
const j1 = [ g1, i1,, ];
$( j1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '$spy[1].valueOf()'
 - 4: '$spy[1].valueOf()'
 - 5: '$spy[1].valueOf()'
 - 6: '$spy[1].valueOf()'
 - 7: '$spy[1].valueOf()'
 - 8: '$spy[1].valueOf()'
 - 9: '$spy[1].valueOf()'
 - 10: '$spy[1].valueOf()'
 - 11: '$spy[1].valueOf()'
 - 12: '$spy[1].valueOf()'
 - 13: '$spy[1].valueOf()'
 - 14: '$spy[1].valueOf()'
 - 15: '$spy[1].valueOf()'
 - 16: '$spy[1].valueOf()'
 - 17: '$spy[1].valueOf()'
 - 18: [0, 0, 0, 0, '12345', -12345, 0, 0, 0, true, false, true, false, false, true, false, true, 0, 12345, 12345]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
