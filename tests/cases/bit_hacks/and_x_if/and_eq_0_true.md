# Preval test case

# and_eq_0_true.md

> Bit hacks > And x if > And eq 0 true
>
> Meh

## Input

`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y === 0; // true
$(z);
`````


## Settled


`````js filename=intro
const tmpFree /*:(number)=>boolean*/ = function $free($$0) {
  const x$1 /*:number*/ = $$0;
  debugger;
  const y /*:number*/ /*&32768*/ /*oneBitAnded*/ = x$1 & 32768;
  const tmpRet /*:boolean*/ /*banged*/ = !y;
  return tmpRet;
};
const tmpUnaryArg /*:unknown*/ = $(1);
const x /*:number*/ = +tmpUnaryArg;
const z /*:boolean*/ = $frfr(tmpFree, x);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(x$1) {
  const y = x$1 & 32768;
  const tmpRet = !y;
  return tmpRet;
};
const tmpUnaryArg = $(1);
$(tmpFree(+tmpUnaryArg));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c & 32768;
  const e = !d;
  return e;
};
const f = $( 1 );
const g = +f;
const h = i( a, g );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $(1);
const x = +tmpUnaryArg;
const y = x & 32768;
const z = y === 0;
$(z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
