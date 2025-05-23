# Preval test case

# implicit_x_right.md

> Normalize > Binary > With > True > Implicit x right
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  true ** x,
  true * x,
  true / x,
  true % x,
  true + x,
  true - x,
  true << x,
  true >> x,
  true >>> x,
  true < x,
  true > x,
  true <= x,
  true >= x,
  true == x,
  true != x,
  true === x,
  true !== x,
  true & x,
  true ^ x,
  true | x,
];
$(arr);
$(true in x);
$(true instanceof x);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:number*/ = 1 ** x;
const tmpArrElement$1 /*:number*/ = 1 * x;
const tmpArrElement$3 /*:number*/ = 1 / x;
const tmpArrElement$5 /*:number*/ = 1 % x;
const tmpArrElement$7 /*:primitive*/ = true + x;
const tmpArrElement$9 /*:number*/ = 1 - x;
const tmpArrElement$11 /*:number*/ = 1 << x;
const tmpArrElement$13 /*:number*/ = 1 >> x;
const tmpArrElement$15 /*:number*/ = 1 >>> x;
const tmpArrElement$17 /*:boolean*/ = true < x;
const tmpArrElement$19 /*:boolean*/ = true > x;
const tmpArrElement$21 /*:boolean*/ = true <= x;
const tmpArrElement$23 /*:boolean*/ = true >= x;
const tmpArrElement$25 /*:boolean*/ = true == x;
const tmpArrElement$27 /*:boolean*/ = true != x;
const tmpArrElement$29 /*:boolean*/ = true === x;
const tmpArrElement$31 /*:boolean*/ = true !== x;
const tmpArrElement$33 /*:number*/ = 1 & x;
const tmpArrElement$35 /*:number*/ = 1 ^ x;
const tmpArrElement$37 /*:number*/ = 1 | x;
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
const tmpCalleeParam /*:boolean*/ = true in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = true instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = 1 ** x;
const tmpArrElement$1 = 1 * x;
const tmpArrElement$3 = 1 / x;
const tmpArrElement$5 = 1 % x;
const tmpArrElement$7 = true + x;
const tmpArrElement$9 = 1 - x;
const tmpArrElement$11 = 1 << x;
const tmpArrElement$13 = 1 >> x;
const tmpArrElement$15 = 1 >>> x;
const tmpArrElement$17 = true < x;
const tmpArrElement$19 = true > x;
const tmpArrElement$21 = true <= x;
const tmpArrElement$23 = true >= x;
const tmpArrElement$25 = true == x;
const tmpArrElement$27 = true != x;
const tmpArrElement$29 = true === x;
const tmpArrElement$31 = true !== x;
const tmpArrElement$33 = 1 & x;
const tmpArrElement$35 = 1 ^ x;
const tmpArrElement$37 = 1 | x;
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
$(true in x);
$(true instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1 ** x;
const b = 1 * x;
const c = 1 / x;
const d = 1 % x;
const e = true + x;
const f = 1 - x;
const g = 1 << x;
const h = 1 >> x;
const i = 1 >>> x;
const j = true < x;
const k = true > x;
const l = true <= x;
const m = true >= x;
const n = true == x;
const o = true != x;
const p = true === x;
const q = true !== x;
const r = 1 & x;
const s = 1 ^ x;
const t = 1 | x;
const u = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t ];
$( u );
const v = true in x;
$( v );
const w = true instanceof x;
$( w );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = 1 ** x;
const tmpArrElement$1 = 1 * x;
const tmpArrElement$3 = 1 / x;
const tmpArrElement$5 = 1 % x;
const tmpArrElement$7 = true + x;
const tmpArrElement$9 = 1 - x;
const tmpArrElement$11 = 1 << x;
const tmpArrElement$13 = 1 >> x;
const tmpArrElement$15 = 1 >>> x;
const tmpArrElement$17 = true < x;
const tmpArrElement$19 = true > x;
const tmpArrElement$21 = true <= x;
const tmpArrElement$23 = true >= x;
const tmpArrElement$25 = true == x;
const tmpArrElement$27 = true != x;
const tmpArrElement$29 = true === x;
const tmpArrElement$31 = true !== x;
const tmpArrElement$33 = 1 & x;
const tmpArrElement$35 = 1 ^ x;
const tmpArrElement$37 = 1 | x;
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
let tmpCalleeParam = true in x;
$(tmpCalleeParam);
let tmpCalleeParam$1 = true instanceof x;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
