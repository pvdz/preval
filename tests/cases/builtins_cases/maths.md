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
const tmpFree$1 /*:(number)=>number*/ = function $free($$0) {
  const ten$1 /*:number*/ = $$0;
  debugger;
  const twoten /*:number*/ = $Math_pow(2, ten$1);
  const zero /*:number*/ = 0 * twoten;
  const divvy /*:number*/ = zero / 695;
  const tmpRet /*:number*/ = $Math_sin(divvy);
  const lottasin /*:number*/ = 1000000 * tmpRet;
  const minned /*:number*/ = $Math_min(10000, lottasin);
  const tmpRet$1 /*:number*/ = $Math_max(-10000, minned);
  return tmpRet$1;
};
const tmpBinLhs /*:unknown*/ = $(120);
const ten /*:number*/ = tmpBinLhs / 12;
const maxed /*:number*/ = $frfr(tmpFree$1, ten);
$(maxed);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free(ten$1) {
  const twoten = $Math_pow(2, ten$1);
  const tmpRet = $Math_sin((0 * twoten) / 695);
  const tmpRet$1 = $Math_max(-10000, $Math_min(10000, 1000000 * tmpRet));
  return tmpRet$1;
};
$($frfr(tmpFree$1, $(120) / 12));
`````

## Pre Normal


`````js filename=intro
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const pow = Math.pow;
const ten = $(120) / 12;
const twoten = $dotCall(pow, Math, `pow`, 2, ten);
const zero = 0 * twoten;
const divvy = zero / 695;
const sinned = $dotCall(sin, Math, `sin`, divvy);
const lottasin = 1000000 * sinned;
const minned = $dotCall(min, Math, `min`, 10000, lottasin);
const maxed = $dotCall(max, Math, `max`, -10000, minned);
$(maxed);
`````

## Normalized


`````js filename=intro
const max = $Math_max;
const min = $Math_min;
const sin = $Math_sin;
const pow = $Math_pow;
const tmpBinLhs = $(120);
const ten = tmpBinLhs / 12;
const twoten = $dotCall(pow, Math, `pow`, 2, ten);
const zero = 0 * twoten;
const divvy = zero / 695;
const sinned = $dotCall(sin, Math, `sin`, divvy);
const lottasin = 1000000 * sinned;
const minned = $dotCall(min, Math, `min`, 10000, lottasin);
const maxed = $dotCall(max, Math, `max`, -10000, minned);
$(maxed);
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
  const i = $Math_min( 10000, h );
  const j = $Math_max( -10000, i );
  return j;
};
const k = $( 120 );
const l = k / 12;
const m = n( a, l );
$( m );
`````

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

Todos triggered:
- maybe fix the type for calling this builtin?
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_sin
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_pow
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_min
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_max
