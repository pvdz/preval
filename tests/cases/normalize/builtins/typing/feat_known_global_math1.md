# Preval test case

# feat_known_global_math1.md

> Normalize > Builtins > Typing > Feat known global math1
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Input

`````js filename=intro
$(typeof Math.asin($spy('Math.asin')));
$(typeof Math.asinh($spy('Math.asinh')));
$(typeof Math.atan($spy('Math.atan')));
$(typeof Math.atan2($spy('Math.atan2')));
$(typeof Math.atanh($spy('Math.atanh')));
$(typeof Math.cbrt($spy('Math.cbrt')));
$(typeof Math.ceil($spy('Math.ceil')));
$(typeof Math.clz32($spy('Math.clz32')));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $spy(`Math.asin`);
$coerce(tmpCalleeParam$1, `number`);
$(`number`);
const tmpCalleeParam$5 /*:unknown*/ = $spy(`Math.asinh`);
$coerce(tmpCalleeParam$5, `number`);
$(`number`);
const tmpCalleeParam$9 /*:unknown*/ = $spy(`Math.atan`);
$coerce(tmpCalleeParam$9, `number`);
$(`number`);
const tmpCalleeParam$13 /*:unknown*/ = $spy(`Math.atan2`);
+tmpCalleeParam$13;
$(`number`);
const tmpCalleeParam$17 /*:unknown*/ = $spy(`Math.atanh`);
$coerce(tmpCalleeParam$17, `number`);
$(`number`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`Math.cbrt`);
$coerce(tmpCalleeParam$21, `number`);
$(`number`);
const tmpCalleeParam$25 /*:unknown*/ = $spy(`Math.ceil`);
$coerce(tmpCalleeParam$25, `number`);
$(`number`);
const tmpCalleeParam$29 /*:unknown*/ = $spy(`Math.clz32`);
$coerce(tmpCalleeParam$29, `number`);
$(`number`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(`Math.asin`), `number`);
$(`number`);
$coerce($spy(`Math.asinh`), `number`);
$(`number`);
$coerce($spy(`Math.atan`), `number`);
$(`number`);
const tmpCalleeParam$13 = $spy(`Math.atan2`);
+tmpCalleeParam$13;
$(`number`);
$coerce($spy(`Math.atanh`), `number`);
$(`number`);
$coerce($spy(`Math.cbrt`), `number`);
$(`number`);
$coerce($spy(`Math.ceil`), `number`);
$(`number`);
$coerce($spy(`Math.clz32`), `number`);
$(`number`);
`````

## Pre Normal


`````js filename=intro
$(typeof Math.asin($spy(`Math.asin`)));
$(typeof Math.asinh($spy(`Math.asinh`)));
$(typeof Math.atan($spy(`Math.atan`)));
$(typeof Math.atan2($spy(`Math.atan2`)));
$(typeof Math.atanh($spy(`Math.atanh`)));
$(typeof Math.cbrt($spy(`Math.cbrt`)));
$(typeof Math.ceil($spy(`Math.ceil`)));
$(typeof Math.clz32($spy(`Math.clz32`)));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = $spy(`Math.asin`);
const tmpUnaryArg = $Math_asin(tmpCalleeParam$1);
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpCalleeParam$5 = $spy(`Math.asinh`);
const tmpUnaryArg$1 = $Math_asinh(tmpCalleeParam$5);
const tmpCalleeParam$3 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$3);
const tmpCalleeParam$9 = $spy(`Math.atan`);
const tmpUnaryArg$3 = $Math_atan(tmpCalleeParam$9);
const tmpCalleeParam$7 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$7);
const tmpCalleeParam$13 = $spy(`Math.atan2`);
const tmpUnaryArg$5 = $Math_atan2(tmpCalleeParam$13);
const tmpCalleeParam$11 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$11);
const tmpCalleeParam$17 = $spy(`Math.atanh`);
const tmpUnaryArg$7 = $Math_atanh(tmpCalleeParam$17);
const tmpCalleeParam$15 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$15);
const tmpCalleeParam$21 = $spy(`Math.cbrt`);
const tmpUnaryArg$9 = $Math_cbrt(tmpCalleeParam$21);
const tmpCalleeParam$19 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$19);
const tmpCalleeParam$25 = $spy(`Math.ceil`);
const tmpUnaryArg$11 = $Math_ceil(tmpCalleeParam$25);
const tmpCalleeParam$23 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$23);
const tmpCalleeParam$29 = $spy(`Math.clz32`);
const tmpUnaryArg$13 = $Math_clz32(tmpCalleeParam$29);
const tmpCalleeParam$27 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$27);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "Math.asin" );
$coerce( a, "number" );
$( "number" );
const b = $spy( "Math.asinh" );
$coerce( b, "number" );
$( "number" );
const c = $spy( "Math.atan" );
$coerce( c, "number" );
$( "number" );
const d = $spy( "Math.atan2" );
+d;
$( "number" );
const e = $spy( "Math.atanh" );
$coerce( e, "number" );
$( "number" );
const f = $spy( "Math.cbrt" );
$coerce( f, "number" );
$( "number" );
const g = $spy( "Math.ceil" );
$coerce( g, "number" );
$( "number" );
const h = $spy( "Math.clz32" );
$coerce( h, "number" );
$( "number" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['Math.asin', 'Math.asin']
 - 2: '$spy[1].valueOf()', 'Math.asin'
 - 3: 'number'
 - 4: 'Creating spy', 2, 1, ['Math.asinh', 'Math.asinh']
 - 5: '$spy[2].valueOf()', 'Math.asinh'
 - 6: 'number'
 - 7: 'Creating spy', 3, 1, ['Math.atan', 'Math.atan']
 - 8: '$spy[3].valueOf()', 'Math.atan'
 - 9: 'number'
 - 10: 'Creating spy', 4, 1, ['Math.atan2', 'Math.atan2']
 - 11: '$spy[4].valueOf()', 'Math.atan2'
 - 12: 'number'
 - 13: 'Creating spy', 5, 1, ['Math.atanh', 'Math.atanh']
 - 14: '$spy[5].valueOf()', 'Math.atanh'
 - 15: 'number'
 - 16: 'Creating spy', 6, 1, ['Math.cbrt', 'Math.cbrt']
 - 17: '$spy[6].valueOf()', 'Math.cbrt'
 - 18: 'number'
 - 19: 'Creating spy', 7, 1, ['Math.ceil', 'Math.ceil']
 - 20: '$spy[7].valueOf()', 'Math.ceil'
 - 21: 'number'
 - 22: 'Creating spy', 8, 1, ['Math.clz32', 'Math.clz32']
 - 23: '$spy[8].valueOf()', 'Math.clz32'
 - 24: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_asin
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_asinh
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_atan
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_atan2
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_atanh
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_cbrt
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_ceil
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_clz32
