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
Number($spy(`String.fromCharCode`));
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Object_is;
const tmpMCP = $spy(`Object.is`);
const tmpUnaryArg = $dotCall(tmpMCF, $object_constructor, `is`, tmpMCP);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpMCF$1 = $Object_isFrozen;
const tmpMCP$1 = $spy(`Object.isFrozen`);
const tmpUnaryArg$1 = $dotCall(tmpMCF$1, $object_constructor, `isFrozen`, tmpMCP$1);
let tmpCalleeParam$1 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$1);
const tmpMCF$3 = $Object_isSealed;
const tmpMCP$3 = $spy(`Object.isSealed`);
const tmpUnaryArg$3 = $dotCall(tmpMCF$3, $object_constructor, `isSealed`, tmpMCP$3);
let tmpCalleeParam$3 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$3);
const tmpMCF$5 = $String_fromCharCode;
const tmpMCP$5 = $spy(`String.fromCharCode`);
const tmpUnaryArg$5 = $dotCall(tmpMCF$5, $string_constructor, `fromCharCode`, tmpMCP$5);
let tmpCalleeParam$5 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$5);
const tmpMCF$7 = $String_fromCodePoint;
const tmpMCP$7 = $spy(`String.fromCodePoint`);
const tmpUnaryArg$7 = $dotCall(tmpMCF$7, $string_constructor, `fromCodePoint`, tmpMCP$7);
let tmpCalleeParam$7 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$7);
const tmpMCF$9 = $String_raw;
const tmpMCP$9 = $spy(`String.raw`);
const tmpUnaryArg$9 = $dotCall(tmpMCF$9, $string_constructor, `raw`, tmpMCP$9);
let tmpCalleeParam$9 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$9);
const tmpUnaryArg$11 = $Math_E;
let tmpCalleeParam$11 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$11, `Math.E`);
const tmpUnaryArg$13 = $Math_LN10;
let tmpCalleeParam$13 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$13, `Math.LN10`);
const tmpUnaryArg$15 = $Math_LN2;
let tmpCalleeParam$15 = typeof tmpUnaryArg$15;
$(tmpCalleeParam$15, `Math.LN2`);
const tmpUnaryArg$17 = $Math_LOG10E;
let tmpCalleeParam$17 = typeof tmpUnaryArg$17;
$(tmpCalleeParam$17, `Math.LOG10E`);
const tmpUnaryArg$19 = $Math_LOG2E;
let tmpCalleeParam$19 = typeof tmpUnaryArg$19;
$(tmpCalleeParam$19, `Math.LOG2E`);
const tmpUnaryArg$21 = $Math_PI;
let tmpCalleeParam$21 = typeof tmpUnaryArg$21;
$(tmpCalleeParam$21, `Math.PI`);
const tmpUnaryArg$23 = $Math_SQRT1_2;
let tmpCalleeParam$23 = typeof tmpUnaryArg$23;
$(tmpCalleeParam$23, `Math.SQRT1_2`);
const tmpUnaryArg$25 = $Math_SQRT2;
let tmpCalleeParam$25 = typeof tmpUnaryArg$25;
$(tmpCalleeParam$25, `Math.SQRT2`);
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
