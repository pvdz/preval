# Preval test case

# feat_known_global_rest.md

> Normalize > Builtins > Typing > Feat known global rest
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof Object.is($spy('Object.is')));
$(typeof Object.isFrozen($spy('Object.isFrozen')));
$(typeof Object.isSealed($spy('Object.isSealed')));
$(typeof String.fromCharCode($spy('String.fromCharCode')));
$(typeof String.fromCodePoint($spy('String.fromCodePoint')));
$(typeof String.raw($spy('String.raw')));
$(typeof Math.E, 'Math.E');
$(typeof Math.LN10, 'Math.LN10');
$(typeof Math.LN2, 'Math.LN2');
$(typeof Math.LOG10E, 'Math.LOG10E');
$(typeof Math.LOG2E, 'Math.LOG2E');
$(typeof Math.PI, 'Math.PI');
$(typeof Math.SQRT1_2, 'Math.SQRT1_2');
$(typeof Math.SQRT2, 'Math.SQRT2');
`````


## Settled


`````js filename=intro
$spy(`Object.is`);
$(`boolean`);
$spy(`Object.isFrozen`);
$(`boolean`);
$spy(`Object.isSealed`);
$(`boolean`);
const tmpMCP$5 /*:unknown*/ = $spy(`String.fromCharCode`);
$coerce(tmpMCP$5, `number`);
$(`string`);
const tmpMCP$7 /*:unknown*/ = $spy(`String.fromCodePoint`);
$String_fromCodePoint(tmpMCP$7);
$(`string`);
const tmpMCP$9 /*:unknown*/ = $spy(`String.raw`);
$String_raw(tmpMCP$9);
$(`string`);
$(`number`, `Math.E`);
$(`number`, `Math.LN10`);
$(`number`, `Math.LN2`);
$(`number`, `Math.LOG10E`);
$(`number`, `Math.LOG2E`);
$(`number`, `Math.PI`);
$(`number`, `Math.SQRT1_2`);
$(`number`, `Math.SQRT2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$spy(`Object.is`);
$(`boolean`);
$spy(`Object.isFrozen`);
$(`boolean`);
$spy(`Object.isSealed`);
$(`boolean`);
$coerce($spy(`String.fromCharCode`), `number`);
$(`string`);
$String_fromCodePoint($spy(`String.fromCodePoint`));
$(`string`);
$String_raw($spy(`String.raw`));
$(`string`);
$(`number`, `Math.E`);
$(`number`, `Math.LN10`);
$(`number`, `Math.LN2`);
$(`number`, `Math.LOG10E`);
$(`number`, `Math.LOG2E`);
$(`number`, `Math.PI`);
$(`number`, `Math.SQRT1_2`);
$(`number`, `Math.SQRT2`);
`````


## PST Settled
With rename=true

`````js filename=intro
$spy( "Object.is" );
$( "boolean" );
$spy( "Object.isFrozen" );
$( "boolean" );
$spy( "Object.isSealed" );
$( "boolean" );
const a = $spy( "String.fromCharCode" );
$coerce( a, "number" );
$( "string" );
const b = $spy( "String.fromCodePoint" );
$String_fromCodePoint( b );
$( "string" );
const c = $spy( "String.raw" );
$String_raw( c );
$( "string" );
$( "number", "Math.E" );
$( "number", "Math.LN10" );
$( "number", "Math.LN2" );
$( "number", "Math.LOG10E" );
$( "number", "Math.LOG2E" );
$( "number", "Math.PI" );
$( "number", "Math.SQRT1_2" );
$( "number", "Math.SQRT2" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_is
- (todo) type trackeed tricks can possibly support static $Object_isFrozen
- (todo) type trackeed tricks can possibly support static $Object_isSealed
- (todo) type trackeed tricks can possibly support static $String_raw


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['Object.is', 'Object.is']
 - 2: 'boolean'
 - 3: 'Creating spy', 2, 1, ['Object.isFrozen', 'Object.isFrozen']
 - 4: 'boolean'
 - 5: 'Creating spy', 3, 1, ['Object.isSealed', 'Object.isSealed']
 - 6: 'boolean'
 - 7: 'Creating spy', 4, 1, ['String.fromCharCode', 'String.fromCharCode']
 - 8: '$spy[4].valueOf()', 'String.fromCharCode'
 - 9: 'string'
 - 10: 'Creating spy', 5, 1, ['String.fromCodePoint', 'String.fromCodePoint']
 - 11: '$spy[5].valueOf()', 'String.fromCodePoint'
 - eval returned: ('<crash[ Invalid code point NaN ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
