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
  const twoten$1 /*:number*/ = $$0;
  debugger;
  const zero /*:number*/ = 0 * twoten$1;
  const tmpRet /*:number*/ = zero / 695;
  return tmpRet;
};
const tmpBinLhs /*:unknown*/ = $(120);
const ten /*:number*/ = tmpBinLhs / 12;
const twoten /*:number*/ = $dotCall($Math_pow, Math, `pow`, 2, ten);
const divvy /*:number*/ = $frfr(tmpFree, twoten);
const sinned /*:number*/ = $dotCall($Math_sin, Math, `sin`, divvy);
const lottasin /*:number*/ = 1000000 * sinned;
const minned /*:number*/ = $dotCall($Math_min, Math, `min`, 10000, lottasin);
const maxed /*:number*/ = $dotCall($Math_max, Math, `max`, -10000, minned);
$(maxed);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(twoten$1) {
  const tmpRet = (0 * twoten$1) / 695;
  return tmpRet;
};
const sinned = $dotCall($Math_sin, Math, `sin`, $frfr(tmpFree, $dotCall($Math_pow, Math, `pow`, 2, $(120) / 12)));
$($dotCall($Math_max, Math, `max`, -10000, $dotCall($Math_min, Math, `min`, 10000, 1000000 * sinned)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = 0 * c;
  const e = d / 695;
  return e;
};
const f = $( 120 );
const g = f / 12;
const h = $dotCall( $Math_pow, Math, "pow", 2, g );
const i = j( a, h );
const k = $dotCall( $Math_sin, Math, "sin", i );
const l = 1000000 * k;
const m = $dotCall( $Math_min, Math, "min", 10000, l );
const n = $dotCall( $Math_max, Math, "max", -10000, m );
$( n );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_pow
- (todo) type trackeed tricks can possibly support static $Math_sin
- (todo) type trackeed tricks can possibly support static $Math_min
- (todo) type trackeed tricks can possibly support static $Math_max


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
