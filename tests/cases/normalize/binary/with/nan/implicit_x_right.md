# Preval test case

# implicit_x_right.md

> Normalize > Binary > With > Nan > Implicit x right
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  NaN ** x,
  NaN * x,
  NaN / x,
  NaN % x,
  NaN + x,
  NaN - x,
  NaN << x,
  NaN >> x,
  NaN >>> x,
  NaN < x,
  NaN > x,
  NaN <= x,
  NaN >= x,
  NaN == x,
  NaN != x,
  NaN === x,
  NaN !== x,
  NaN & x,
  NaN ^ x,
  NaN | x,
];
$(arr);
$(NaN in x);
$(NaN instanceof x);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:number*/ = NaN ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 /*:primitive*/ = NaN + x;
x ** 0;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const arr /*:array*/ = [
  tmpArrElement,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = NaN in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = NaN instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = NaN ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = NaN + x;
x ** 0;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
$([
  tmpArrElement,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(NaN in x);
$(NaN instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = NaN ** x;
x ** 0;
x ** 0;
x ** 0;
const b = NaN + x;
x ** 0;
const c = 0 << x;
const d = 0 >> x;
const e = 0 >>> x;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const f = 0 ^ x;
const g = 0 | x;
const h = [ a, NaN, NaN, NaN, b, NaN, c, d, e, false, false, false, false, false, true, false, true, 0, f, g ];
$( h );
const i = NaN in x;
$( i );
const j = NaN instanceof x;
$( j );
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
