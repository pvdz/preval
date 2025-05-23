# Preval test case

# feat_known_global_math2.md

> Normalize > Builtins > Typing > Feat known global math2
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof Math.cos($spy('Math.cos')));
$(typeof Math.cosh($spy('Math.cosh')));
$(typeof Math.exp($spy('Math.exp')));
$(typeof Math.expm1($spy('Math.expm1')));
$(typeof Math.floor($spy('Math.floor')));
$(typeof Math.fround($spy('Math.fround')));
$(typeof Math.imul($spy('Math.imul')));
$(typeof Math.log($spy('Math.log')));
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $spy(`Math.cos`);
$coerce(tmpMCP, `number`);
$(`number`);
const tmpMCP$1 /*:unknown*/ = $spy(`Math.cosh`);
$coerce(tmpMCP$1, `number`);
$(`number`);
const tmpMCP$3 /*:unknown*/ = $spy(`Math.exp`);
$coerce(tmpMCP$3, `number`);
$(`number`);
const tmpMCP$5 /*:unknown*/ = $spy(`Math.expm1`);
$coerce(tmpMCP$5, `number`);
$(`number`);
const tmpMCP$7 /*:unknown*/ = $spy(`Math.floor`);
$coerce(tmpMCP$7, `number`);
$(`number`);
const tmpMCP$9 /*:unknown*/ = $spy(`Math.fround`);
$coerce(tmpMCP$9, `number`);
$(`number`);
const tmpMCP$11 /*:unknown*/ = $spy(`Math.imul`);
$coerce(tmpMCP$11, `number`);
$(`number`);
const tmpMCP$13 /*:unknown*/ = $spy(`Math.log`);
$coerce(tmpMCP$13, `number`);
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(`Math.cos`), `number`);
$(`number`);
$coerce($spy(`Math.cosh`), `number`);
$(`number`);
$coerce($spy(`Math.exp`), `number`);
$(`number`);
$coerce($spy(`Math.expm1`), `number`);
$(`number`);
$coerce($spy(`Math.floor`), `number`);
$(`number`);
$coerce($spy(`Math.fround`), `number`);
$(`number`);
$coerce($spy(`Math.imul`), `number`);
$(`number`);
$coerce($spy(`Math.log`), `number`);
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "Math.cos" );
$coerce( a, "number" );
$( "number" );
const b = $spy( "Math.cosh" );
$coerce( b, "number" );
$( "number" );
const c = $spy( "Math.exp" );
$coerce( c, "number" );
$( "number" );
const d = $spy( "Math.expm1" );
$coerce( d, "number" );
$( "number" );
const e = $spy( "Math.floor" );
$coerce( e, "number" );
$( "number" );
const f = $spy( "Math.fround" );
$coerce( f, "number" );
$( "number" );
const g = $spy( "Math.imul" );
$coerce( g, "number" );
$( "number" );
const h = $spy( "Math.log" );
$coerce( h, "number" );
$( "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cos;
const tmpMCP = $spy(`Math.cos`);
const tmpUnaryArg = $dotCall(tmpMCF, Math, `cos`, tmpMCP);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpMCF$1 = $Math_cosh;
const tmpMCP$1 = $spy(`Math.cosh`);
const tmpUnaryArg$1 = $dotCall(tmpMCF$1, Math, `cosh`, tmpMCP$1);
let tmpCalleeParam$1 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$1);
const tmpMCF$3 = $Math_exp;
const tmpMCP$3 = $spy(`Math.exp`);
const tmpUnaryArg$3 = $dotCall(tmpMCF$3, Math, `exp`, tmpMCP$3);
let tmpCalleeParam$3 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$3);
const tmpMCF$5 = $Math_expm1;
const tmpMCP$5 = $spy(`Math.expm1`);
const tmpUnaryArg$5 = $dotCall(tmpMCF$5, Math, `expm1`, tmpMCP$5);
let tmpCalleeParam$5 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$5);
const tmpMCF$7 = $Math_floor;
const tmpMCP$7 = $spy(`Math.floor`);
const tmpUnaryArg$7 = $dotCall(tmpMCF$7, Math, `floor`, tmpMCP$7);
let tmpCalleeParam$7 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$7);
const tmpMCF$9 = $Math_fround;
const tmpMCP$9 = $spy(`Math.fround`);
const tmpUnaryArg$9 = $dotCall(tmpMCF$9, Math, `fround`, tmpMCP$9);
let tmpCalleeParam$9 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$9);
const tmpMCF$11 = $Math_imul;
const tmpMCP$11 = $spy(`Math.imul`);
const tmpUnaryArg$11 = $dotCall(tmpMCF$11, Math, `imul`, tmpMCP$11);
let tmpCalleeParam$11 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$11);
const tmpMCF$13 = $Math_log;
const tmpMCP$13 = $spy(`Math.log`);
const tmpUnaryArg$13 = $dotCall(tmpMCF$13, Math, `log`, tmpMCP$13);
let tmpCalleeParam$13 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$13);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cos
- (todo) type trackeed tricks can possibly support static $Math_cosh
- (todo) type trackeed tricks can possibly support static $Math_exp
- (todo) type trackeed tricks can possibly support static $Math_expm1
- (todo) type trackeed tricks can possibly support static $Math_floor
- (todo) type trackeed tricks can possibly support static $Math_fround
- (todo) type trackeed tricks can possibly support static $Math_imul
- (todo) type trackeed tricks can possibly support static $Math_log


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['Math.cos', 'Math.cos']
 - 2: '$spy[1].valueOf()', 'Math.cos'
 - 3: 'number'
 - 4: 'Creating spy', 2, 1, ['Math.cosh', 'Math.cosh']
 - 5: '$spy[2].valueOf()', 'Math.cosh'
 - 6: 'number'
 - 7: 'Creating spy', 3, 1, ['Math.exp', 'Math.exp']
 - 8: '$spy[3].valueOf()', 'Math.exp'
 - 9: 'number'
 - 10: 'Creating spy', 4, 1, ['Math.expm1', 'Math.expm1']
 - 11: '$spy[4].valueOf()', 'Math.expm1'
 - 12: 'number'
 - 13: 'Creating spy', 5, 1, ['Math.floor', 'Math.floor']
 - 14: '$spy[5].valueOf()', 'Math.floor'
 - 15: 'number'
 - 16: 'Creating spy', 6, 1, ['Math.fround', 'Math.fround']
 - 17: '$spy[6].valueOf()', 'Math.fround'
 - 18: 'number'
 - 19: 'Creating spy', 7, 1, ['Math.imul', 'Math.imul']
 - 20: '$spy[7].valueOf()', 'Math.imul'
 - 21: 'number'
 - 22: 'Creating spy', 8, 1, ['Math.log', 'Math.log']
 - 23: '$spy[8].valueOf()', 'Math.log'
 - 24: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
