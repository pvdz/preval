# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > False > Nan op implicit x
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  false ** x,
  false * x,
  false / x,
  false % x,
  false + x,
  false - x,
  false << x,
  false >> x,
  false >>> x,
  false < x,
  false > x,
  false <= x,
  false >= x,
  false == x,
  false != x,
  false === x,
  false !== x,
  false & x,
  false ^ x,
  false | x,
];
$(arr);

const arr2 = [
  false in x,
  false instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  false ** x,
  false * x,
  false / x,
  false % x,
  false + x,
  false - x,
  false << x,
  false >> x,
  false >>> x,
  false < x,
  false > x,
  false <= x,
  false >= x,
  false == x,
  false != x,
  false === x,
  false !== x,
  false & x,
  false ^ x,
  false | x,
];
$(arr);
const arr2 = [false in x, false instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = false + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = false < x;
const tmpArrElement$19 = false > x;
const tmpArrElement$21 = false <= x;
const tmpArrElement$23 = false >= x;
const tmpArrElement$25 = false == x;
const tmpArrElement$27 = false != x;
const tmpArrElement$29 = false === x;
const tmpArrElement$31 = false !== x;
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
const tmpArrElement$39 = false in x;
const tmpArrElement$41 = false instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const tmpArrElement /*:number*/ = 0 ** x;
const tmpArrElement$1 /*:number*/ = 0 * x;
const tmpArrElement$3 /*:number*/ = 0 / x;
const tmpArrElement$5 /*:number*/ = 0 % x;
const tmpArrElement$7 /*:primitive*/ = false + x;
const tmpArrElement$9 /*:number*/ = 0 - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = false < x;
const tmpArrElement$19 /*:boolean*/ = false > x;
const tmpArrElement$21 /*:boolean*/ = false <= x;
const tmpArrElement$23 /*:boolean*/ = false >= x;
const tmpArrElement$25 /*:boolean*/ = false == x;
const tmpArrElement$27 /*:boolean*/ = false != x;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const tmpArrElement$29 /*:boolean*/ = false === x;
const tmpArrElement$31 /*:boolean*/ = false !== x;
const arr /*:array*/ = [
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
const tmpArrElement$39 /*:boolean*/ = false in x;
const tmpArrElement$41 /*:boolean*/ = false instanceof x;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0 ** x;
const b = 0 * x;
const c = 0 / x;
const d = 0 % x;
const e = false + x;
const f = 0 - x;
const g = 0 << x;
const h = 0 >> x;
const i = 0 >>> x;
const j = false < x;
const k = false > x;
const l = false <= x;
const m = false >= x;
const n = false == x;
const o = false != x;
x ** 0;
const p = 0 ^ x;
const q = 0 | x;
const r = false === x;
const s = false !== x;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, r, s, 0, p, q ];
$( t );
const u = false in x;
const v = false instanceof x;
const w = [ u, v ];
$( w );
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
