# Preval test case

# implicit_x_left.md

> Normalize > Binary > With > True > Implicit x left
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  x ** true,
  x * true,
  x / true,
  x % true,
  x + true,
  x - true,
  x << true,
  x >> true,
  x >>> true,
  x < true,
  x > true,
  x <= true,
  x >= true,
  x == true,
  x != true,
  x === true,
  x !== true,
  x & true,
  x ^ true,
  x | true,
];
$(arr);
$(x in true);
$(x instanceof true);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:number*/ = x ** 1;
const tmpArrElement$1 /*:number*/ = x * 1;
const tmpArrElement$3 /*:number*/ = x / 1;
const tmpArrElement$5 /*:number*/ = x % 1;
const tmpArrElement$7 /*:primitive*/ = x + true;
const tmpArrElement$9 /*:number*/ = x - 1;
const tmpArrElement$11 /*:number*/ = x << 1;
const tmpArrElement$13 /*:number*/ = x >> 1;
const tmpArrElement$15 /*:number*/ = x >>> 1;
const tmpArrElement$17 /*:boolean*/ = x < true;
const tmpArrElement$19 /*:boolean*/ = x > true;
const tmpArrElement$21 /*:boolean*/ = x <= true;
const tmpArrElement$23 /*:boolean*/ = x >= true;
const tmpArrElement$25 /*:boolean*/ = x == true;
const tmpArrElement$27 /*:boolean*/ = x != true;
const tmpArrElement$29 /*:boolean*/ = x === true;
const tmpArrElement$31 /*:boolean*/ = x !== true;
const tmpArrElement$33 /*:number*/ = x & 1;
const tmpArrElement$35 /*:number*/ = x ^ 1;
const tmpArrElement$37 /*:number*/ = x | 1;
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
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = x in true;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof true;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = x ** 1;
const tmpArrElement$1 = x * 1;
const tmpArrElement$3 = x / 1;
const tmpArrElement$5 = x % 1;
const tmpArrElement$7 = x + true;
const tmpArrElement$9 = x - 1;
const tmpArrElement$11 = x << 1;
const tmpArrElement$13 = x >> 1;
const tmpArrElement$15 = x >>> 1;
const tmpArrElement$17 = x < true;
const tmpArrElement$19 = x > true;
const tmpArrElement$21 = x <= true;
const tmpArrElement$23 = x >= true;
const tmpArrElement$25 = x == true;
const tmpArrElement$27 = x != true;
const tmpArrElement$29 = x === true;
const tmpArrElement$31 = x !== true;
const tmpArrElement$33 = x & 1;
const tmpArrElement$35 = x ^ 1;
const tmpArrElement$37 = x | 1;
$([
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
]);
$(x in true);
$(x instanceof true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x ** 1;
const b = x * 1;
const c = x / 1;
const d = x % 1;
const e = x + true;
const f = x - 1;
const g = x << 1;
const h = x >> 1;
const i = x >>> 1;
const j = x < true;
const k = x > true;
const l = x <= true;
const m = x >= true;
const n = x == true;
const o = x != true;
const p = x === true;
const q = x !== true;
const r = x & 1;
const s = x ^ 1;
const t = x | 1;
const u = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t ];
$( u );
const v = x in true;
$( v );
const w = x instanceof true;
$( w );
`````


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
