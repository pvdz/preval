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
$('Math.log10:', typeof Math.log10($spy('Math.log10')));
$('Math.log1p:', typeof Math.log1p($spy('Math.log1p')));
$('Math.log2:', typeof Math.log2($spy('Math.log2')));
$('Math.max:', typeof Math.max($spy('Math.max')));
$('Math.min:', typeof Math.min($spy('Math.min')));
$('Math.pow:', typeof Math.pow($spy('Math.pow')));
$('Math.random:', typeof Math.random($spy('Math.random')));
$('Math.round:', typeof Math.round($spy('Math.round')));
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $spy(`Math.log10`);
$coerce(tmpMCP, `number`);
$(`Math.log10:`, `number`);
const tmpMCP$1 /*:unknown*/ = $spy(`Math.log1p`);
$coerce(tmpMCP$1, `number`);
$(`Math.log1p:`, `number`);
const tmpMCP$3 /*:unknown*/ = $spy(`Math.log2`);
$coerce(tmpMCP$3, `number`);
$(`Math.log2:`, `number`);
const tmpMCP$5 /*:unknown*/ = $spy(`Math.max`);
$coerce(tmpMCP$5, `number`);
$(`Math.max:`, `number`);
const tmpMCP$7 /*:unknown*/ = $spy(`Math.min`);
$coerce(tmpMCP$7, `number`);
$(`Math.min:`, `number`);
const tmpMCP$9 /*:unknown*/ = $spy(`Math.pow`);
$coerce(tmpMCP$9, `number`);
$(`Math.pow:`, `number`);
$spy(`Math.random`);
$(`Math.random:`, `number`);
const tmpMCP$13 /*:unknown*/ = $spy(`Math.round`);
$coerce(tmpMCP$13, `number`);
$(`Math.round:`, `number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(`Math.log10`), `number`);
$(`Math.log10:`, `number`);
$coerce($spy(`Math.log1p`), `number`);
$(`Math.log1p:`, `number`);
$coerce($spy(`Math.log2`), `number`);
$(`Math.log2:`, `number`);
$coerce($spy(`Math.max`), `number`);
$(`Math.max:`, `number`);
$coerce($spy(`Math.min`), `number`);
$(`Math.min:`, `number`);
$coerce($spy(`Math.pow`), `number`);
$(`Math.pow:`, `number`);
$spy(`Math.random`);
$(`Math.random:`, `number`);
$coerce($spy(`Math.round`), `number`);
$(`Math.round:`, `number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "Math.log10" );
$coerce( a, "number" );
$( "Math.log10:", "number" );
const b = $spy( "Math.log1p" );
$coerce( b, "number" );
$( "Math.log1p:", "number" );
const c = $spy( "Math.log2" );
$coerce( c, "number" );
$( "Math.log2:", "number" );
const d = $spy( "Math.max" );
$coerce( d, "number" );
$( "Math.max:", "number" );
const e = $spy( "Math.min" );
$coerce( e, "number" );
$( "Math.min:", "number" );
const f = $spy( "Math.pow" );
$coerce( f, "number" );
$( "Math.pow:", "number" );
$spy( "Math.random" );
$( "Math.random:", "number" );
const g = $spy( "Math.round" );
$coerce( g, "number" );
$( "Math.round:", "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log10;
const tmpMCP = $spy(`Math.log10`);
const tmpUnaryArg = $dotCall(tmpMCF, Math, `log10`, tmpMCP);
let tmpCalleeParam = typeof tmpUnaryArg;
$(`Math.log10:`, tmpCalleeParam);
const tmpMCF$1 = $Math_log1p;
const tmpMCP$1 = $spy(`Math.log1p`);
const tmpUnaryArg$1 = $dotCall(tmpMCF$1, Math, `log1p`, tmpMCP$1);
let tmpCalleeParam$1 = typeof tmpUnaryArg$1;
$(`Math.log1p:`, tmpCalleeParam$1);
const tmpMCF$3 = $Math_log2;
const tmpMCP$3 = $spy(`Math.log2`);
const tmpUnaryArg$3 = $dotCall(tmpMCF$3, Math, `log2`, tmpMCP$3);
let tmpCalleeParam$3 = typeof tmpUnaryArg$3;
$(`Math.log2:`, tmpCalleeParam$3);
const tmpMCF$5 = $Math_max;
const tmpMCP$5 = $spy(`Math.max`);
const tmpUnaryArg$5 = $dotCall(tmpMCF$5, Math, `max`, tmpMCP$5);
let tmpCalleeParam$5 = typeof tmpUnaryArg$5;
$(`Math.max:`, tmpCalleeParam$5);
const tmpMCF$7 = $Math_min;
const tmpMCP$7 = $spy(`Math.min`);
const tmpUnaryArg$7 = $dotCall(tmpMCF$7, Math, `min`, tmpMCP$7);
let tmpCalleeParam$7 = typeof tmpUnaryArg$7;
$(`Math.min:`, tmpCalleeParam$7);
const tmpMCF$9 = $Math_pow;
const tmpMCP$9 = $spy(`Math.pow`);
const tmpUnaryArg$9 = $dotCall(tmpMCF$9, Math, `pow`, tmpMCP$9);
let tmpCalleeParam$9 = typeof tmpUnaryArg$9;
$(`Math.pow:`, tmpCalleeParam$9);
const tmpMCF$11 = $Math_random;
const tmpMCP$11 = $spy(`Math.random`);
const tmpUnaryArg$11 = $dotCall(tmpMCF$11, Math, `random`, tmpMCP$11);
let tmpCalleeParam$11 = typeof tmpUnaryArg$11;
$(`Math.random:`, tmpCalleeParam$11);
const tmpMCF$13 = $Math_round;
const tmpMCP$13 = $spy(`Math.round`);
const tmpUnaryArg$13 = $dotCall(tmpMCF$13, Math, `round`, tmpMCP$13);
let tmpCalleeParam$13 = typeof tmpUnaryArg$13;
$(`Math.round:`, tmpCalleeParam$13);
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
 - 3: 'Math.log10:', 'number'
 - 4: 'Creating spy', 2, 1, ['Math.log1p', 'Math.log1p']
 - 5: '$spy[2].valueOf()', 'Math.log1p'
 - 6: 'Math.log1p:', 'number'
 - 7: 'Creating spy', 3, 1, ['Math.log2', 'Math.log2']
 - 8: '$spy[3].valueOf()', 'Math.log2'
 - 9: 'Math.log2:', 'number'
 - 10: 'Creating spy', 4, 1, ['Math.max', 'Math.max']
 - 11: '$spy[4].valueOf()', 'Math.max'
 - 12: 'Math.max:', 'number'
 - 13: 'Creating spy', 5, 1, ['Math.min', 'Math.min']
 - 14: '$spy[5].valueOf()', 'Math.min'
 - 15: 'Math.min:', 'number'
 - 16: 'Creating spy', 6, 1, ['Math.pow', 'Math.pow']
 - 17: '$spy[6].valueOf()', 'Math.pow'
 - 18: 'Math.pow:', 'number'
 - 19: 'Creating spy', 7, 1, ['Math.random', 'Math.random']
 - 20: 'Math.random:', 'number'
 - 21: 'Creating spy', 8, 1, ['Math.round', 'Math.round']
 - 22: '$spy[8].valueOf()', 'Math.round'
 - 23: 'Math.round:', 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
