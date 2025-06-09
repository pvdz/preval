# Preval test case

# feat_known_global_nons.md

> Normalize > Builtins > Typing > Feat known global nons
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof Math.sign($spy('Math.sign')));
$(typeof Math.sin($spy('Math.sin')));
$(typeof Math.hypot($spy('Math.hypot')));
$(typeof String($spy('String')));
$(typeof Number($spy('Number')));
$(typeof Boolean($spy('Boolean')));
$(typeof parseInt($spy('parseInt')));
$(typeof parseFloat($spy('parseFloat')));
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $spy(`Math.sign`);
$coerce(tmpMCP, `number`);
$(`number`);
const tmpMCP$1 /*:unknown*/ = $spy(`Math.sin`);
$coerce(tmpMCP$1, `number`);
$(`number`);
const tmpMCP$3 /*:unknown*/ = $spy(`Math.hypot`);
$coerce(tmpMCP$3, `number`);
$(`number`);
const tmpCalleeParam$7 /*:unknown*/ = $spy(`String`);
$coerce(tmpCalleeParam$7, `string`);
$(`string`);
const tmpCalleeParam$11 /*:unknown*/ = $spy(`Number`);
$coerce(tmpCalleeParam$11, `number`);
$(`number`);
$spy(`Boolean`);
$(`boolean`);
const tmpCalleeParam$19 /*:unknown*/ = $spy(`parseInt`);
$coerce(tmpCalleeParam$19, `string`);
$(`number`);
const tmpCalleeParam$23 /*:unknown*/ = $spy(`parseFloat`);
$coerce(tmpCalleeParam$23, `string`);
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(`Math.sign`), `number`);
$(`number`);
$coerce($spy(`Math.sin`), `number`);
$(`number`);
$coerce($spy(`Math.hypot`), `number`);
$(`number`);
$coerce($spy(`String`), `string`);
$(`string`);
$coerce($spy(`Number`), `number`);
$(`number`);
$spy(`Boolean`);
$(`boolean`);
$coerce($spy(`parseInt`), `string`);
$(`number`);
$coerce($spy(`parseFloat`), `string`);
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "Math.sign" );
$coerce( a, "number" );
$( "number" );
const b = $spy( "Math.sin" );
$coerce( b, "number" );
$( "number" );
const c = $spy( "Math.hypot" );
$coerce( c, "number" );
$( "number" );
const d = $spy( "String" );
$coerce( d, "string" );
$( "string" );
const e = $spy( "Number" );
$coerce( e, "number" );
$( "number" );
$spy( "Boolean" );
$( "boolean" );
const f = $spy( "parseInt" );
$coerce( f, "string" );
$( "number" );
const g = $spy( "parseFloat" );
$coerce( g, "string" );
$( "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_sign;
const tmpMCP = $spy(`Math.sign`);
const tmpUnaryArg = $dotCall(tmpMCF, Math, `sign`, tmpMCP);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpMCF$1 = $Math_sin;
const tmpMCP$1 = $spy(`Math.sin`);
const tmpUnaryArg$1 = $dotCall(tmpMCF$1, Math, `sin`, tmpMCP$1);
let tmpCalleeParam$1 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$1);
const tmpMCF$3 = $Math_hypot;
const tmpMCP$3 = $spy(`Math.hypot`);
const tmpUnaryArg$3 = $dotCall(tmpMCF$3, Math, `hypot`, tmpMCP$3);
let tmpCalleeParam$3 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$3);
let tmpCalleeParam$7 = $spy(`String`);
const tmpUnaryArg$5 = $coerce(tmpCalleeParam$7, `string`);
let tmpCalleeParam$5 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$5);
let tmpCalleeParam$11 = $spy(`Number`);
const tmpUnaryArg$7 = $coerce(tmpCalleeParam$11, `number`);
let tmpCalleeParam$9 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$9);
let tmpCalleeParam$15 = $spy(`Boolean`);
const tmpUnaryArg$9 = $boolean_constructor(tmpCalleeParam$15);
let tmpCalleeParam$13 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$13);
let tmpCalleeParam$19 = $spy(`parseInt`);
const tmpUnaryArg$11 = $Number_parseInt(tmpCalleeParam$19);
let tmpCalleeParam$17 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$17);
let tmpCalleeParam$23 = $spy(`parseFloat`);
const tmpUnaryArg$13 = $Number_parseFloat(tmpCalleeParam$23);
let tmpCalleeParam$21 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$21);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_hypot
- (todo) type trackeed tricks can possibly support static $Math_sign
- (todo) type trackeed tricks can possibly support static $Math_sin
- (todo) type trackeed tricks can possibly support static $Number_parseFloat
- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['Math.sign', 'Math.sign']
 - 2: '$spy[1].valueOf()', 'Math.sign'
 - 3: 'number'
 - 4: 'Creating spy', 2, 1, ['Math.sin', 'Math.sin']
 - 5: '$spy[2].valueOf()', 'Math.sin'
 - 6: 'number'
 - 7: 'Creating spy', 3, 1, ['Math.hypot', 'Math.hypot']
 - 8: '$spy[3].valueOf()', 'Math.hypot'
 - 9: 'number'
 - 10: 'Creating spy', 4, 1, ['String', 'String']
 - 11: '$spy[4].toString()', 'String'
 - 12: 'string'
 - 13: 'Creating spy', 5, 1, ['Number', 'Number']
 - 14: '$spy[5].valueOf()', 'Number'
 - 15: 'number'
 - 16: 'Creating spy', 6, 1, ['Boolean', 'Boolean']
 - 17: 'boolean'
 - 18: 'Creating spy', 7, 1, ['parseInt', 'parseInt']
 - 19: '$spy[7].toString()', 'parseInt'
 - 20: 'number'
 - 21: 'Creating spy', 8, 1, ['parseFloat', 'parseFloat']
 - 22: '$spy[8].toString()', 'parseFloat'
 - 23: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
