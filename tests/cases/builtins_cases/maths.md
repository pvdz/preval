# Preval test case

# maths.md

> Builtins cases > Maths
>
>

## Input

`````js filename=intro
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const pow = Math.pow;
const ten = $(120) / 12;
const twoten = $dotCall(pow, Math, 'pow', 2, ten);
const zero = 0 * twoten;
const divvy = zero / 695;
const sinned = $dotCall(sin, Math, 'sin', divvy);
const lottasin = 1000000 * sinned;
const minned = $dotCall(min, Math, 'min', 10000, lottasin);
const maxed = $dotCall(max, Math, 'max', -10000, minned);
$(maxed);
`````


## Settled


`````js filename=intro
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const ten$1 /*:number*/ = $$0;
  debugger;
  const twoten /*:number*/ = $Math_pow(2, ten$1);
  const zero /*:number*/ = 0 * twoten;
  const divvy /*:number*/ = zero / 695;
  const sinned /*:number*/ = $Math_sin(divvy);
  const tmpRet /*:number*/ = 1000000 * sinned;
  return tmpRet;
};
const tmpBinLhs /*:unknown*/ = $(120);
const ten /*:number*/ = tmpBinLhs / 12;
const lottasin /*:number*/ = $frfr(tmpFree, ten);
const minned /*:number*/ = $dotCall($Math_min, Math, `min`, 10000, lottasin);
const maxed /*:number*/ = $dotCall($Math_max, Math, `max`, -10000, minned);
$(maxed);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(ten$1) {
  const twoten = $Math_pow(2, ten$1);
  const sinned = $Math_sin((0 * twoten) / 695);
  const tmpRet = 1000000 * sinned;
  return tmpRet;
};
$($dotCall($Math_max, Math, `max`, -10000, $dotCall($Math_min, Math, `min`, 10000, $frfr(tmpFree, $(120) / 12))));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $Math_pow( 2, c );
  const e = 0 * d;
  const f = e / 695;
  const g = $Math_sin( f );
  const h = 1000000 * g;
  return h;
};
const i = $( 120 );
const j = i / 12;
const k = l( a, j );
const m = $dotCall( $Math_min, Math, "min", 10000, k );
const n = $dotCall( $Math_max, Math, "max", -10000, m );
$( n );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_min
- (todo) type trackeed tricks can possibly support static $Math_max
- (todo) type trackeed tricks can possibly support static $Math_pow
- (todo) type trackeed tricks can possibly support static $Math_sin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 120
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
