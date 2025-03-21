# Preval test case

# feat_known_global_math2.md

> Normalize > Builtins > Typing > Feat known global math2
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

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
const tmpCalleeParam$1 /*:unknown*/ = $spy(`Math.cos`);
$coerce(tmpCalleeParam$1, `number`);
$(`number`);
const tmpCalleeParam$5 /*:unknown*/ = $spy(`Math.cosh`);
$coerce(tmpCalleeParam$5, `number`);
$(`number`);
const tmpCalleeParam$9 /*:unknown*/ = $spy(`Math.exp`);
$coerce(tmpCalleeParam$9, `number`);
$(`number`);
const tmpCalleeParam$13 /*:unknown*/ = $spy(`Math.expm1`);
$coerce(tmpCalleeParam$13, `number`);
$(`number`);
const tmpCalleeParam$17 /*:unknown*/ = $spy(`Math.floor`);
$coerce(tmpCalleeParam$17, `number`);
$(`number`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`Math.fround`);
$coerce(tmpCalleeParam$21, `number`);
$(`number`);
const tmpCalleeParam$25 /*:unknown*/ = $spy(`Math.imul`);
+tmpCalleeParam$25;
$(`number`);
const tmpCalleeParam$29 /*:unknown*/ = $spy(`Math.log`);
$coerce(tmpCalleeParam$29, `number`);
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
const tmpCalleeParam$25 = $spy(`Math.imul`);
+tmpCalleeParam$25;
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
+g;
$( "number" );
const h = $spy( "Math.log" );
$coerce( h, "number" );
$( "number" );
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
