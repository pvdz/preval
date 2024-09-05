# Preval test case

# nan_op_x_spy.md

> Normalize > Binary > With > Null > Nan op x spy
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy('floop');

const arr = [
  null ** x,
  null * x,
  null / x,
  null % x,
  null + x,
  null - x,
  null << x,
  null >> x,
  null >>> x,
  null < x,
  null > x,
  null <= x,
  null >= x,
  null == x,
  null != x,
  null === x,
  null !== x,
  null & x,
  null ^ x,
  null | x,
];
$(arr);

const arr2 = [
  null in x,
  null instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const x = $spy(`floop`);
const arr = [
  null ** x,
  null * x,
  null / x,
  null % x,
  null + x,
  null - x,
  null << x,
  null >> x,
  null >>> x,
  null < x,
  null > x,
  null <= x,
  null >= x,
  null == x,
  null != x,
  null === x,
  null !== x,
  null & x,
  null ^ x,
  null | x,
];
$(arr);
const arr2 = [null in x, null instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const x = $spy(`floop`);
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = null + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = null < x;
const tmpArrElement$19 = null > x;
const tmpArrElement$21 = null <= x;
const tmpArrElement$23 = null >= x;
const tmpArrElement$25 = null == x;
const tmpArrElement$27 = null != x;
const tmpArrElement$29 = null === x;
const tmpArrElement$31 = null !== x;
x & 0;
const tmpArrElement$33 = 0;
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
const tmpArrElement$39 = null in x;
const tmpArrElement$41 = null instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const x = $spy(`floop`);
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = null + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = null < x;
const tmpArrElement$19 = null > x;
const tmpArrElement$21 = null <= x;
const tmpArrElement$23 = null >= x;
const tmpArrElement$25 = null == x;
const tmpArrElement$27 = null != x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const tmpArrElement$29 = null === x;
const tmpArrElement$31 = null !== x;
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
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = null in x;
const tmpArrElement$41 = null instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "floop" );
const b = 0 ** a;
const c = 0 * a;
const d = 0 / a;
const e = 0 % a;
const f = null + a;
const g = 0 - a;
const h = 0 << a;
const i = 0 >> a;
const j = 0 >>> a;
const k = null < a;
const l = null > a;
const m = null <= a;
const n = null >= a;
const o = null == a;
const p = null != a;
a ** 0;
const q = 0 ^ a;
const r = 0 | a;
const s = null === a;
const t = null !== a;
const u = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, s, t, 0, q, r ];
$( u );
const v = null in a;
const w = null instanceof a;
const x = [ v, w ];
$( x );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['floop', 'floop']
 - 2: '$spy[1].valueOf()', 'floop'
 - 3: '$spy[1].valueOf()', 'floop'
 - 4: '$spy[1].valueOf()', 'floop'
 - 5: '$spy[1].valueOf()', 'floop'
 - 6: '$spy[1].valueOf()', 'floop'
 - 7: '$spy[1].valueOf()', 'floop'
 - 8: '$spy[1].valueOf()', 'floop'
 - 9: '$spy[1].valueOf()', 'floop'
 - 10: '$spy[1].valueOf()', 'floop'
 - 11: '$spy[1].valueOf()', 'floop'
 - 12: '$spy[1].valueOf()', 'floop'
 - 13: '$spy[1].valueOf()', 'floop'
 - 14: '$spy[1].valueOf()', 'floop'
 - 15: '$spy[1].valueOf()', 'floop'
 - 16: '$spy[1].valueOf()', 'floop'
 - 17: '$spy[1].valueOf()', 'floop'
 - 18: [NaN, NaN, NaN, NaN, 'nullfloop', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 0, 0]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
