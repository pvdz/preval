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
  const tmpRet /*:number*/ = 0 * twoten;
  const divvy /*:number*/ = tmpRet / 695;
  const sinned /*:number*/ = $Math_sin(divvy);
  const lottasin /*:number*/ = 1000000 * sinned;
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
  const sinned = $Math_sin((0 * twoten) / 695);
  const tmpRet$1 = $Math_max(-10000, $Math_min(10000, 1000000 * sinned));
  return tmpRet$1;
};
$(tmpFree$1($(120) / 12));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0 ) {
  const b = $$0;
  debugger;
  const c = $Math_pow( 2, b );
  const d = 0 * c;
  const e = d / 695;
  const f = $Math_sin( e );
  const g = 1000000 * f;
  const h = $Math_min( 10000, g );
  const i = $Math_max( -10000, h );
  return i;
};
const j = $( 120 );
const k = j / 12;
const l = m( a, k );
$( l );
`````


## Normalized
(This is what phase1 received the first time)

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


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_max
- (todo) type trackeed tricks can possibly support static $Math_min
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
