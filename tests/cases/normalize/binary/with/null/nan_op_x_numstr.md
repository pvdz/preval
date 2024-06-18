# Preval test case

# nan_op_x_numstr.md

> Normalize > Binary > With > Null > Nan op x numstr
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy("300");

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
const x = $spy(`300`);
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
const x = $spy(`300`);
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
const x = $spy(`300`);
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
x ** 0;
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
const a = $spy( "300" );
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
const q = null === a;
const r = null !== a;
a ** 0;
const s = 0 ^ a;
const t = 0 | a;
const u = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, 0, s, t ];
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
 - 1: 'Creating spy', 1, 1, ['300', '300']
 - 2: '$spy[1].valueOf()', '300'
 - 3: '$spy[1].valueOf()', '300'
 - 4: '$spy[1].valueOf()', '300'
 - 5: '$spy[1].valueOf()', '300'
 - 6: '$spy[1].valueOf()', '300'
 - 7: '$spy[1].valueOf()', '300'
 - 8: '$spy[1].valueOf()', '300'
 - 9: '$spy[1].valueOf()', '300'
 - 10: '$spy[1].valueOf()', '300'
 - 11: '$spy[1].valueOf()', '300'
 - 12: '$spy[1].valueOf()', '300'
 - 13: '$spy[1].valueOf()', '300'
 - 14: '$spy[1].valueOf()', '300'
 - 15: '$spy[1].valueOf()', '300'
 - 16: '$spy[1].valueOf()', '300'
 - 17: '$spy[1].valueOf()', '300'
 - 18: [0, 0, 0, 0, 'null300', -300, 0, 0, 0, true, false, true, false, false, true, false, true, 0, 300, 300]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
