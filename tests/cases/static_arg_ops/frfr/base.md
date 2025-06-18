# Preval test case

# base.md

> Static arg ops > Frfr > Base
>
> Free func call at start of function can be outlined too

## Input

`````js filename=intro
let x = $('50');
const g = function $free(a, b, c) {
  const p = a + b;
  const q = p / c;
  return q;
}
const f = function (a, b, c) {
  const y = $frfr(g, a, b, c);
  $(y); // Try to prevent inlining of function...
  $(y);
  $(y);
  return y + 5;
};
$(f(x*1, x*2, x*3));
$(f(x-1, x-2, x-3));
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`50`);
const g /*:(number, number, number)=>number*/ = function $free($$0, $$1, $$2) {
  const a /*:number*/ = $$0;
  const b /*:number*/ = $$1;
  const c /*:number*/ = $$2;
  debugger;
  const p /*:number*/ = a + b;
  const q /*:number*/ = p / c;
  return q;
};
const f /*:(number)=>undefined*/ = function ($$0) {
  const y /*:number*/ = $$0;
  debugger;
  $(y);
  $(y);
  $(y);
  return undefined;
};
const tmpCalleeParam$1 /*:number*/ = x * 1;
const tmpCalleeParam$3 /*:number*/ = x * 2;
const tmpCalleeParam$5 /*:number*/ = x * 3;
const tmpFrfrOutline /*:number*/ = $frfr(g, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
f(tmpFrfrOutline);
const tmpCalleeParam /*:number*/ = tmpFrfrOutline + 5;
$(tmpCalleeParam);
const tmpCalleeParam$9 /*:number*/ = x - 1;
const tmpCalleeParam$11 /*:number*/ = x - 2;
const tmpCalleeParam$13 /*:number*/ = x - 3;
const tmpFrfrOutline$1 /*:number*/ = $frfr(g, tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13);
f(tmpFrfrOutline$1);
const tmpCalleeParam$7 /*:number*/ = tmpFrfrOutline$1 + 5;
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`50`);
const g = function $free(a, b, c) {
  const q = (a + b) / c;
  return q;
};
const f = function (y) {
  $(y);
  $(y);
  $(y);
};
const tmpFrfrOutline = $frfr(g, x * 1, x * 2, x * 3);
f(tmpFrfrOutline);
$(tmpFrfrOutline + 5);
const tmpFrfrOutline$1 = $frfr(g, x - 1, x - 2, x - 3);
f(tmpFrfrOutline$1);
$(tmpFrfrOutline$1 + 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "50" );
const b = function c($$0,$$1,$$2 ) {
  const d = $$0;
  const e = $$1;
  const f = $$2;
  debugger;
  const g = d + e;
  const h = g / f;
  return h;
};
const i = function($$0 ) {
  const j = $$0;
  debugger;
  $( j );
  $( j );
  $( j );
  return undefined;
};
const k = a * 1;
const l = a * 2;
const m = a * 3;
const n = o( b, k, l, m );
i( n );
const p = n + 5;
$( p );
const q = a - 1;
const r = a - 2;
const s = a - 3;
const t = o( b, q, r, s );
i( t );
const u = t + 5;
$( u );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`50`);
const g = function $free($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  const p = a + b;
  const q = p / c;
  return q;
};
const f = function ($$0, $$1, $$2) {
  let a$1 = $$0;
  let b$1 = $$1;
  let c$1 = $$2;
  debugger;
  const y = $frfr(g, a$1, b$1, c$1);
  $(y);
  $(y);
  $(y);
  const tmpReturnArg = y + 5;
  return tmpReturnArg;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = x * 1;
let tmpCalleeParam$3 = x * 2;
let tmpCalleeParam$5 = x * 3;
let tmpCalleeParam = f(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
let tmpCalleeParam$9 = x - 1;
let tmpCalleeParam$11 = x - 2;
let tmpCalleeParam$13 = x - 3;
let tmpCalleeParam$7 = f(tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13);
$(tmpCalleeParam$7);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '50'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 6
 - 6: 2.0638297872340425
 - 7: 2.0638297872340425
 - 8: 2.0638297872340425
 - 9: 7.0638297872340425
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
