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
const tmpStringFirstArg /*:unknown*/ = $spy(`String`);
$coerce(tmpStringFirstArg, `string`);
$(`string`);
const tmpNumberFirstArg /*:unknown*/ = $spy(`Number`);
$coerce(tmpNumberFirstArg, `number`);
$(`number`);
$spy(`Boolean`);
$(`boolean`);
const tmpCalleeParam$15 /*:unknown*/ = $spy(`parseInt`);
$coerce(tmpCalleeParam$15, `string`);
$(`number`);
const tmpCalleeParam$19 /*:unknown*/ = $spy(`parseFloat`);
$coerce(tmpCalleeParam$19, `string`);
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


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_hypot
- (todo) type trackeed tricks can possibly support static $Math_sign
- (todo) type trackeed tricks can possibly support static $Math_sin


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
