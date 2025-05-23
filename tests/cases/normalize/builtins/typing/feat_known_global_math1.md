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
const tmpMCP /*:unknown*/ = $spy(`Math.asin`);
$coerce(tmpMCP, `number`);
$(`number`);
const tmpMCP$1 /*:unknown*/ = $spy(`Math.asinh`);
$coerce(tmpMCP$1, `number`);
$(`number`);
const tmpMCP$3 /*:unknown*/ = $spy(`Math.atan`);
$coerce(tmpMCP$3, `number`);
$(`number`);
const tmpMCP$5 /*:unknown*/ = $spy(`Math.atan2`);
$coerce(tmpMCP$5, `number`);
$(`number`);
const tmpMCP$7 /*:unknown*/ = $spy(`Math.atanh`);
$coerce(tmpMCP$7, `number`);
$(`number`);
const tmpMCP$9 /*:unknown*/ = $spy(`Math.cbrt`);
$coerce(tmpMCP$9, `number`);
$(`number`);
const tmpMCP$11 /*:unknown*/ = $spy(`Math.ceil`);
$coerce(tmpMCP$11, `number`);
$(`number`);
const tmpMCP$13 /*:unknown*/ = $spy(`Math.clz32`);
$coerce(tmpMCP$13, `number`);
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
$coerce($spy(`Math.atan2`), `number`);
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
$coerce( d, "number" );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asin;
const tmpMCP = $spy(`Math.asin`);
const tmpUnaryArg = $dotCall(tmpMCF, Math, `asin`, tmpMCP);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpMCF$1 = $Math_asinh;
const tmpMCP$1 = $spy(`Math.asinh`);
const tmpUnaryArg$1 = $dotCall(tmpMCF$1, Math, `asinh`, tmpMCP$1);
let tmpCalleeParam$1 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$1);
const tmpMCF$3 = $Math_atan;
const tmpMCP$3 = $spy(`Math.atan`);
const tmpUnaryArg$3 = $dotCall(tmpMCF$3, Math, `atan`, tmpMCP$3);
let tmpCalleeParam$3 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$3);
const tmpMCF$5 = $Math_atan2;
const tmpMCP$5 = $spy(`Math.atan2`);
const tmpUnaryArg$5 = $dotCall(tmpMCF$5, Math, `atan2`, tmpMCP$5);
let tmpCalleeParam$5 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$5);
const tmpMCF$7 = $Math_atanh;
const tmpMCP$7 = $spy(`Math.atanh`);
const tmpUnaryArg$7 = $dotCall(tmpMCF$7, Math, `atanh`, tmpMCP$7);
let tmpCalleeParam$7 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$7);
const tmpMCF$9 = $Math_cbrt;
const tmpMCP$9 = $spy(`Math.cbrt`);
const tmpUnaryArg$9 = $dotCall(tmpMCF$9, Math, `cbrt`, tmpMCP$9);
let tmpCalleeParam$9 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$9);
const tmpMCF$11 = $Math_ceil;
const tmpMCP$11 = $spy(`Math.ceil`);
const tmpUnaryArg$11 = $dotCall(tmpMCF$11, Math, `ceil`, tmpMCP$11);
let tmpCalleeParam$11 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$11);
const tmpMCF$13 = $Math_clz32;
const tmpMCP$13 = $spy(`Math.clz32`);
const tmpUnaryArg$13 = $dotCall(tmpMCF$13, Math, `clz32`, tmpMCP$13);
let tmpCalleeParam$13 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$13);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asin
- (todo) type trackeed tricks can possibly support static $Math_asinh
- (todo) type trackeed tricks can possibly support static $Math_atan
- (todo) type trackeed tricks can possibly support static $Math_atan2
- (todo) type trackeed tricks can possibly support static $Math_atanh
- (todo) type trackeed tricks can possibly support static $Math_cbrt
- (todo) type trackeed tricks can possibly support static $Math_ceil
- (todo) type trackeed tricks can possibly support static $Math_clz32


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
