# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > Null > Implicit x op nan
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  x ** null,
  x * null,
  x / null,
  x % null,
  x + null,
  x - null,
  x << null,
  x >> null,
  x >>> null,
  x < null,
  x > null,
  x <= null,
  x >= null,
  x == null,
  x != null,
  x === null,
  x !== null,
  x & null,
  x ^ null,
  x | null,
];
$(arr);

const arr2 = [
  x in null,
  x instanceof null,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  x ** null,
  x * null,
  x / null,
  x % null,
  x + null,
  x - null,
  x << null,
  x >> null,
  x >>> null,
  x < null,
  x > null,
  x <= null,
  x >= null,
  x == null,
  x != null,
  x === null,
  x !== null,
  x & null,
  x ^ null,
  x | null,
];
$(arr);
const arr2 = [x in null, x instanceof null];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + null;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < null;
const tmpArrElement$19 = x > null;
const tmpArrElement$21 = x <= null;
const tmpArrElement$23 = x >= null;
const tmpArrElement$25 = x == null;
const tmpArrElement$27 = x != null;
const tmpArrElement$29 = x === null;
const tmpArrElement$31 = x !== null;
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
const tmpArrElement$39 = x in null;
const tmpArrElement$41 = x instanceof null;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const tmpArrElement /*:number*/ = x ** 0;
const tmpArrElement$1 /*:number*/ = x * 0;
const tmpArrElement$3 /*:number*/ = x / 0;
const tmpArrElement$5 /*:number*/ = x % 0;
const tmpArrElement$7 = x + null;
const tmpArrElement$9 /*:number*/ = x - 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < null;
const tmpArrElement$19 /*:boolean*/ = x > null;
const tmpArrElement$21 /*:boolean*/ = x <= null;
const tmpArrElement$23 /*:boolean*/ = x >= null;
const tmpArrElement$25 /*:boolean*/ = x == null;
const tmpArrElement$27 /*:boolean*/ = x != null;
x ** 0;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
const tmpArrElement$29 /*:boolean*/ = x === null;
const tmpArrElement$31 /*:boolean*/ = x !== null;
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
const tmpArrElement$39 /*:boolean*/ = x in null;
const tmpArrElement$41 /*:boolean*/ = x instanceof null;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = x ** 0;
const b = x * 0;
const c = x / 0;
const d = x % 0;
const e = x + null;
const f = x - 0;
const g = x << 0;
const h = x >> 0;
const i = x >>> 0;
const j = x < null;
const k = x > null;
const l = x <= null;
const m = x >= null;
const n = x == null;
const o = x != null;
x ** 0;
const p = x ^ 0;
const q = x | 0;
const r = x === null;
const s = x !== null;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, r, s, 0, p, q ];
$( t );
const u = x in null;
const v = x instanceof null;
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
