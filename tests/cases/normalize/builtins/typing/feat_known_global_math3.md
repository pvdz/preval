# Preval test case

# feat_known_global_math3.md

> Normalize > Builtins > Typing > Feat known global math3
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof Math.log10($spy('Math.log10')));
$(typeof Math.log1p($spy('Math.log1p')));
$(typeof Math.log2($spy('Math.log2')));
$(typeof Math.max($spy('Math.max')));
$(typeof Math.min($spy('Math.min')));
$(typeof Math.pow($spy('Math.pow')));
$(typeof Math.random($spy('Math.random')));
$(typeof Math.round($spy('Math.round')));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $spy(`Math.log10`);
$coerce(tmpCalleeParam$1, `number`);
$(`number`);
const tmpCalleeParam$5 /*:unknown*/ = $spy(`Math.log1p`);
$coerce(tmpCalleeParam$5, `number`);
$(`number`);
const tmpCalleeParam$9 /*:unknown*/ = $spy(`Math.log2`);
$coerce(tmpCalleeParam$9, `number`);
$(`number`);
const tmpCalleeParam$13 /*:unknown*/ = $spy(`Math.max`);
$coerce(tmpCalleeParam$13, `number`);
$(`number`);
const tmpCalleeParam$17 /*:unknown*/ = $spy(`Math.min`);
$coerce(tmpCalleeParam$17, `number`);
$(`number`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`Math.pow`);
$coerce(tmpCalleeParam$21, `number`);
$(`number`);
$spy(`Math.random`);
$(`number`);
const tmpCalleeParam$29 /*:unknown*/ = $spy(`Math.round`);
$coerce(tmpCalleeParam$29, `number`);
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(`Math.log10`), `number`);
$(`number`);
$coerce($spy(`Math.log1p`), `number`);
$(`number`);
$coerce($spy(`Math.log2`), `number`);
$(`number`);
$coerce($spy(`Math.max`), `number`);
$(`number`);
$coerce($spy(`Math.min`), `number`);
$(`number`);
$coerce($spy(`Math.pow`), `number`);
$(`number`);
$spy(`Math.random`);
$(`number`);
$coerce($spy(`Math.round`), `number`);
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "Math.log10" );
$coerce( a, "number" );
$( "number" );
const b = $spy( "Math.log1p" );
$coerce( b, "number" );
$( "number" );
const c = $spy( "Math.log2" );
$coerce( c, "number" );
$( "number" );
const d = $spy( "Math.max" );
$coerce( d, "number" );
$( "number" );
const e = $spy( "Math.min" );
$coerce( e, "number" );
$( "number" );
const f = $spy( "Math.pow" );
$coerce( f, "number" );
$( "number" );
$spy( "Math.random" );
$( "number" );
const g = $spy( "Math.round" );
$coerce( g, "number" );
$( "number" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log10
- (todo) type trackeed tricks can possibly support static $Math_log1p
- (todo) type trackeed tricks can possibly support static $Math_log2
- (todo) type trackeed tricks can possibly support static $Math_max
- (todo) type trackeed tricks can possibly support static $Math_min
- (todo) type trackeed tricks can possibly support static $Math_pow
- (todo) type trackeed tricks can possibly support static $Math_random
- (todo) type trackeed tricks can possibly support static $Math_round


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['Math.log10', 'Math.log10']
 - 2: '$spy[1].valueOf()', 'Math.log10'
 - 3: 'number'
 - 4: 'Creating spy', 2, 1, ['Math.log1p', 'Math.log1p']
 - 5: '$spy[2].valueOf()', 'Math.log1p'
 - 6: 'number'
 - 7: 'Creating spy', 3, 1, ['Math.log2', 'Math.log2']
 - 8: '$spy[3].valueOf()', 'Math.log2'
 - 9: 'number'
 - 10: 'Creating spy', 4, 1, ['Math.max', 'Math.max']
 - 11: '$spy[4].valueOf()', 'Math.max'
 - 12: 'number'
 - 13: 'Creating spy', 5, 1, ['Math.min', 'Math.min']
 - 14: '$spy[5].valueOf()', 'Math.min'
 - 15: 'number'
 - 16: 'Creating spy', 6, 1, ['Math.pow', 'Math.pow']
 - 17: '$spy[6].valueOf()', 'Math.pow'
 - 18: 'number'
 - 19: 'Creating spy', 7, 1, ['Math.random', 'Math.random']
 - 20: 'number'
 - 21: 'Creating spy', 8, 1, ['Math.round', 'Math.round']
 - 22: '$spy[8].valueOf()', 'Math.round'
 - 23: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
