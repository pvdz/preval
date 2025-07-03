# Preval test case

# base2.md

> Static arg ops > Frfr > Base2
>
> Free func call at start of function can be outlined too

## Input

`````js filename=intro
const tmpFree$1 /*:(number, number, number)=>number*/ = function $free($$0, $$1, $$2) {
  const $dlr_$$10 /*:number*/ = $$0;
  const $dlr_$$12 /*:number*/ = $$1;
  const $dlr_$$14 /*:number*/ = $$2;
  debugger;
  let tmpRet$1 /*:unknown*/ = undefined;
  const $dlr_$$0 /*:unknown*/ = $dlr_$$10;
  const $dlr_$$1 /*:unknown*/ = $dlr_$$12;
  const $dlr_$$2 /*:unknown*/ = $dlr_$$14;
  const p /*:number*/ = $dlr_$$10 + $dlr_$$12;
  const q /*:number*/ = p / $dlr_$$14;
  let tmpSSA_tmpRet$1 /*:unknown*/ = q;
  return q;
};
const x /*:unknown*/ = $(`50`);
const f /*:(number, number, number)=>number*/ = function($$0, $$1, $$2) {
  const $dlr_$$4 /*:number*/ = $$0;
  const $dlr_$$6 /*:number*/ = $$1;
  const $dlr_$$8 /*:number*/ = $$2;
  debugger;
  const y /*:number*/ = $frfr(tmpFree$1, $dlr_$$4, $dlr_$$6, $dlr_$$8);
  $(y);
  $(y);
  $(y);
  const tmpReturnArg /*:number*/ = y + 5;
  return tmpReturnArg;
};
const tmpCalleeParam$1 /*:number*/ = x * 1;
const tmpCalleeParam$3 /*:number*/ = x * 2;
const tmpCalleeParam$5 /*:number*/ = x * 3;
const tmpCalleeParam /*:number*/ = f(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(tmpCalleeParam);
const tmpCalleeParam$9 /*:number*/ = x - 1;
const tmpCalleeParam$11 /*:number*/ = x - 2;
const tmpCalleeParam$13 /*:number*/ = x - 3;
const tmpCalleeParam$7 /*:number*/ = f(tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13);
$(tmpCalleeParam$7);
`````


## Settled


`````js filename=intro
const tmpFree /*:(number, number, number)=>number*/ = function $free($$0, $$1, $$2) {
  const $dlr_$$9 /*:number*/ = $$0;
  const $dlr_$$11 /*:number*/ = $$1;
  const $dlr_$$13 /*:number*/ = $$2;
  debugger;
  const p /*:number*/ = $dlr_$$9 + $dlr_$$11;
  const q /*:number*/ = p / $dlr_$$13;
  return q;
};
const x /*:unknown*/ = $(`50`);
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
const tmpFrfrOutline /*:number*/ = $frfr(tmpFree, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
f(tmpFrfrOutline);
const tmpCalleeParam /*:number*/ = tmpFrfrOutline + 5;
$(tmpCalleeParam);
const tmpCalleeParam$9 /*:number*/ = x - 1;
const tmpCalleeParam$11 /*:number*/ = x - 2;
const tmpCalleeParam$13 /*:number*/ = x - 3;
const tmpFrfrOutline$1 /*:number*/ = $frfr(tmpFree, tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13);
f(tmpFrfrOutline$1);
const tmpCalleeParam$7 /*:number*/ = tmpFrfrOutline$1 + 5;
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free($dlr_$$9, $dlr_$$11, $dlr_$$13) {
  const q = ($dlr_$$9 + $dlr_$$11) / $dlr_$$13;
  return q;
};
const x = $(`50`);
const f = function (y) {
  $(y);
  $(y);
  $(y);
};
const tmpFrfrOutline = tmpFree(x * 1, x * 2, x * 3);
f(tmpFrfrOutline);
$(tmpFrfrOutline + 5);
const tmpFrfrOutline$1 = tmpFree(x - 1, x - 2, x - 3);
f(tmpFrfrOutline$1);
$(tmpFrfrOutline$1 + 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1,$$2 ) {
  const c = $$0;
  const d = $$1;
  const e = $$2;
  debugger;
  const f = c + d;
  const g = f / e;
  return g;
};
const h = $( "50" );
const i = function($$0 ) {
  const j = $$0;
  debugger;
  $( j );
  $( j );
  $( j );
  return undefined;
};
const k = h * 1;
const l = h * 2;
const m = h * 3;
const n = o( a, k, l, m );
i( n );
const p = n + 5;
$( p );
const q = h - 1;
const r = h - 2;
const s = h - 3;
const t = o( a, q, r, s );
i( t );
const u = t + 5;
$( u );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree$1 = function $free($$0, $$1, $$2) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  let $dlr_$$2 = $$2;
  debugger;
  const $dlr_$$10 = $dlr_$$0;
  const $dlr_$$12 = $dlr_$$1;
  const $dlr_$$14 = $dlr_$$2;
  let tmpRet$1 = undefined;
  const $dlr_$$3 = $dlr_$$10;
  const $dlr_$$5 = $dlr_$$12;
  const $dlr_$$7 = $dlr_$$14;
  const p = $dlr_$$10 + $dlr_$$12;
  const q = p / $dlr_$$14;
  let tmpSSA_tmpRet$1 = q;
  return q;
};
const x = $(`50`);
const f = function ($$0, $$1, $$2) {
  let $dlr_$$9 = $$0;
  let $dlr_$$11 = $$1;
  let $dlr_$$13 = $$2;
  debugger;
  const $dlr_$$4 = $dlr_$$9;
  const $dlr_$$6 = $dlr_$$11;
  const $dlr_$$8 = $dlr_$$13;
  const y = $frfr(tmpFree$1, $dlr_$$4, $dlr_$$6, $dlr_$$13);
  $(y);
  $(y);
  $(y);
  const tmpReturnArg = y + 5;
  return tmpReturnArg;
};
const tmpCalleeParam$1 = x * 1;
const tmpCalleeParam$3 = x * 2;
const tmpCalleeParam$5 = x * 3;
const tmpCalleeParam = f(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(tmpCalleeParam);
const tmpCalleeParam$9 = x - 1;
const tmpCalleeParam$11 = x - 2;
const tmpCalleeParam$13 = x - 3;
const tmpCalleeParam$7 = f(tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13);
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
