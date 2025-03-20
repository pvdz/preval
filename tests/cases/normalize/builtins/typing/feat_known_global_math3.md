# Preval test case

# feat_known_global_math3.md

> Normalize > Builtins > Typing > Feat known global math3
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

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
+tmpCalleeParam$13;
$(`number`);
const tmpCalleeParam$17 /*:unknown*/ = $spy(`Math.min`);
+tmpCalleeParam$17;
$(`number`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`Math.pow`);
+tmpCalleeParam$21;
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
const tmpCalleeParam$13 = $spy(`Math.max`);
+tmpCalleeParam$13;
$(`number`);
const tmpCalleeParam$17 = $spy(`Math.min`);
+tmpCalleeParam$17;
$(`number`);
const tmpCalleeParam$21 = $spy(`Math.pow`);
+tmpCalleeParam$21;
$(`number`);
$spy(`Math.random`);
$(`number`);
$coerce($spy(`Math.round`), `number`);
$(`number`);
`````

## Pre Normal


`````js filename=intro
$(typeof Math.log10($spy(`Math.log10`)));
$(typeof Math.log1p($spy(`Math.log1p`)));
$(typeof Math.log2($spy(`Math.log2`)));
$(typeof Math.max($spy(`Math.max`)));
$(typeof Math.min($spy(`Math.min`)));
$(typeof Math.pow($spy(`Math.pow`)));
$(typeof Math.random($spy(`Math.random`)));
$(typeof Math.round($spy(`Math.round`)));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = $spy(`Math.log10`);
const tmpUnaryArg = $Math_log10(tmpCalleeParam$1);
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpCalleeParam$5 = $spy(`Math.log1p`);
const tmpUnaryArg$1 = $Math_log1p(tmpCalleeParam$5);
const tmpCalleeParam$3 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$3);
const tmpCalleeParam$9 = $spy(`Math.log2`);
const tmpUnaryArg$3 = $Math_log2(tmpCalleeParam$9);
const tmpCalleeParam$7 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$7);
const tmpCalleeParam$13 = $spy(`Math.max`);
const tmpUnaryArg$5 = $Math_max(tmpCalleeParam$13);
const tmpCalleeParam$11 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$11);
const tmpCalleeParam$17 = $spy(`Math.min`);
const tmpUnaryArg$7 = $Math_min(tmpCalleeParam$17);
const tmpCalleeParam$15 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$15);
const tmpCalleeParam$21 = $spy(`Math.pow`);
const tmpUnaryArg$9 = $Math_pow(tmpCalleeParam$21);
const tmpCalleeParam$19 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$19);
const tmpCalleeParam$25 = $spy(`Math.random`);
const tmpUnaryArg$11 = $Math_random(tmpCalleeParam$25);
const tmpCalleeParam$23 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$23);
const tmpCalleeParam$29 = $spy(`Math.round`);
const tmpUnaryArg$13 = $Math_round(tmpCalleeParam$29);
const tmpCalleeParam$27 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$27);
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
+d;
$( "number" );
const e = $spy( "Math.min" );
+e;
$( "number" );
const f = $spy( "Math.pow" );
+f;
$( "number" );
$spy( "Math.random" );
$( "number" );
const g = $spy( "Math.round" );
$coerce( g, "number" );
$( "number" );
`````

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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_log10
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_log1p
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_log2
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_max
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_min
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_pow
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_random
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_round
