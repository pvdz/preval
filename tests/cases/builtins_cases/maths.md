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
const tmpBinLhs /*:unknown*/ = $(120);
const ten /*:number*/ = tmpBinLhs / 12;
const twoten /*:unknown*/ = $dotCall($Math_pow, Math, `pow`, 2, ten);
const zero /*:number*/ = 0 * twoten;
const divvy /*:number*/ = zero / 695;
const sinned /*:unknown*/ = $dotCall($Math_sin, Math, `sin`, divvy);
const lottasin /*:number*/ = 1000000 * sinned;
const minned /*:unknown*/ = $dotCall($Math_min, Math, `min`, 10000, lottasin);
const maxed /*:unknown*/ = $dotCall($Math_max, Math, `max`, -10000, minned);
$(maxed);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const twoten = $dotCall($Math_pow, Math, `pow`, 2, $(120) / 12);
const sinned = $dotCall($Math_sin, Math, `sin`, (0 * twoten) / 695);
$($dotCall($Math_max, Math, `max`, -10000, $dotCall($Math_min, Math, `min`, 10000, 1000000 * sinned)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 120 );
const b = a / 12;
const c = $dotCall( $Math_pow, Math, "pow", 2, b );
const d = 0 * c;
const e = d / 695;
const f = $dotCall( $Math_sin, Math, "sin", e );
const g = 1000000 * f;
const h = $dotCall( $Math_min, Math, "min", 10000, g );
const i = $dotCall( $Math_max, Math, "max", -10000, h );
$( i );
`````


## Todos triggered


- (todo) Missed opportunity to inline a type tracked trick for $Math_pow
- (todo) Missed opportunity to inline a type tracked trick for $Math_sin
- (todo) Missed opportunity to inline a type tracked trick for $Math_min
- (todo) Missed opportunity to inline a type tracked trick for $Math_max


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
