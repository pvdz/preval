# Preval test case

# feat_known_global_nons.md

> Normalize > Builtins > Typing > Feat known global nons
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

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
const tmpCalleeParam$1 /*:unknown*/ = $spy(`Math.sign`);
$coerce(tmpCalleeParam$1, `number`);
$(`number`);
const tmpCalleeParam$5 /*:unknown*/ = $spy(`Math.sin`);
$coerce(tmpCalleeParam$5, `number`);
$(`number`);
const tmpCalleeParam$9 /*:unknown*/ = $spy(`Math.hypot`);
+tmpCalleeParam$9;
$(`number`);
const tmpStringFirstArg /*:unknown*/ = $spy(`String`);
$coerce(tmpStringFirstArg, `string`);
$(`string`);
const tmpStringFirstArg$1 /*:unknown*/ = $spy(`Number`);
$coerce(tmpStringFirstArg$1, `number`);
$(`number`);
$spy(`Boolean`);
$(`boolean`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`parseInt`);
$coerce(tmpCalleeParam$21, `string`);
$(`number`);
const tmpCalleeParam$25 /*:unknown*/ = $spy(`parseFloat`);
$coerce(tmpCalleeParam$25, `string`);
$(`number`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(`Math.sign`), `number`);
$(`number`);
$coerce($spy(`Math.sin`), `number`);
$(`number`);
const tmpCalleeParam$9 = $spy(`Math.hypot`);
+tmpCalleeParam$9;
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

## Pre Normal


`````js filename=intro
$(typeof Math.sign($spy(`Math.sign`)));
$(typeof Math.sin($spy(`Math.sin`)));
$(typeof Math.hypot($spy(`Math.hypot`)));
$(typeof String($spy(`String`)));
$(typeof Number($spy(`Number`)));
$(typeof Boolean($spy(`Boolean`)));
$(typeof parseInt($spy(`parseInt`)));
$(typeof parseFloat($spy(`parseFloat`)));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = $spy(`Math.sign`);
const tmpUnaryArg = $Math_sign(tmpCalleeParam$1);
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpCalleeParam$5 = $spy(`Math.sin`);
const tmpUnaryArg$1 = $Math_sin(tmpCalleeParam$5);
const tmpCalleeParam$3 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$3);
const tmpCalleeParam$9 = $spy(`Math.hypot`);
const tmpUnaryArg$3 = $Math_hypot(tmpCalleeParam$9);
const tmpCalleeParam$7 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$7);
const tmpStringFirstArg = $spy(`String`);
const tmpUnaryArg$5 = $coerce(tmpStringFirstArg, `string`);
const tmpCalleeParam$11 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$11);
const tmpStringFirstArg$1 = $spy(`Number`);
const tmpUnaryArg$7 = $coerce(tmpStringFirstArg$1, `number`);
const tmpCalleeParam$13 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$13);
const tmpCalleeParam$17 = $spy(`Boolean`);
const tmpUnaryArg$9 = Boolean(tmpCalleeParam$17);
const tmpCalleeParam$15 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$15);
const tmpCalleeParam$21 = $spy(`parseInt`);
const tmpUnaryArg$11 = parseInt(tmpCalleeParam$21);
const tmpCalleeParam$19 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$19);
const tmpCalleeParam$25 = $spy(`parseFloat`);
const tmpUnaryArg$13 = parseFloat(tmpCalleeParam$25);
const tmpCalleeParam$23 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$23);
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
+c;
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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Math_sign
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Math_sin
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Math_hypot
