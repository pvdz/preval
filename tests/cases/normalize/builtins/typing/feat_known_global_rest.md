# Preval test case

# feat_known_global_rest.md

> Normalize > Builtins > Typing > Feat known global rest
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

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
const tmpCalleeParam$13 /*:unknown*/ = $spy(`String.fromCharCode`);
+tmpCalleeParam$13;
$(`string`);
const tmpCalleeParam$17 /*:unknown*/ = $spy(`String.fromCodePoint`);
$String_fromCodePoint(tmpCalleeParam$17);
$(`string`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`String.raw`);
$String_raw(tmpCalleeParam$21);
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
const tmpCalleeParam$13 = $spy(`String.fromCharCode`);
+tmpCalleeParam$13;
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

## Pre Normal


`````js filename=intro
$(typeof Object.is($spy(`Object.is`)));
$(typeof Object.isFrozen($spy(`Object.isFrozen`)));
$(typeof Object.isSealed($spy(`Object.isSealed`)));
$(typeof String.fromCharCode($spy(`String.fromCharCode`)));
$(typeof String.fromCodePoint($spy(`String.fromCodePoint`)));
$(typeof String.raw($spy(`String.raw`)));
$(typeof Math.E, `Math.E`);
$(typeof Math.LN10, `Math.LN10`);
$(typeof Math.LN2, `Math.LN2`);
$(typeof Math.LOG10E, `Math.LOG10E`);
$(typeof Math.LOG2E, `Math.LOG2E`);
$(typeof Math.PI, `Math.PI`);
$(typeof Math.SQRT1_2, `Math.SQRT1_2`);
$(typeof Math.SQRT2, `Math.SQRT2`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = $spy(`Object.is`);
const tmpUnaryArg = $Object_is(tmpCalleeParam$1);
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpCalleeParam$5 = $spy(`Object.isFrozen`);
const tmpUnaryArg$1 = $Object_isFrozen(tmpCalleeParam$5);
const tmpCalleeParam$3 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$3);
const tmpCalleeParam$9 = $spy(`Object.isSealed`);
const tmpUnaryArg$3 = $Object_isSealed(tmpCalleeParam$9);
const tmpCalleeParam$7 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$7);
const tmpCalleeParam$13 = $spy(`String.fromCharCode`);
const tmpUnaryArg$5 = $String_fromCharCode(tmpCalleeParam$13);
const tmpCalleeParam$11 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$11);
const tmpCalleeParam$17 = $spy(`String.fromCodePoint`);
const tmpUnaryArg$7 = $String_fromCodePoint(tmpCalleeParam$17);
const tmpCalleeParam$15 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$15);
const tmpCalleeParam$21 = $spy(`String.raw`);
const tmpUnaryArg$9 = $String_raw(tmpCalleeParam$21);
const tmpCalleeParam$19 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$19);
const tmpUnaryArg$11 = $Math_E;
const tmpCalleeParam$23 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$23, `Math.E`);
const tmpUnaryArg$13 = $Math_LN10;
const tmpCalleeParam$25 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$25, `Math.LN10`);
const tmpUnaryArg$15 = $Math_LN2;
const tmpCalleeParam$27 = typeof tmpUnaryArg$15;
$(tmpCalleeParam$27, `Math.LN2`);
const tmpUnaryArg$17 = $Math_LOG10E;
const tmpCalleeParam$29 = typeof tmpUnaryArg$17;
$(tmpCalleeParam$29, `Math.LOG10E`);
const tmpUnaryArg$19 = $Math_LOG2E;
const tmpCalleeParam$31 = typeof tmpUnaryArg$19;
$(tmpCalleeParam$31, `Math.LOG2E`);
const tmpUnaryArg$21 = $Math_PI;
const tmpCalleeParam$33 = typeof tmpUnaryArg$21;
$(tmpCalleeParam$33, `Math.PI`);
const tmpUnaryArg$23 = $Math_SQRT1_2;
const tmpCalleeParam$35 = typeof tmpUnaryArg$23;
$(tmpCalleeParam$35, `Math.SQRT1_2`);
const tmpUnaryArg$25 = $Math_SQRT2;
const tmpCalleeParam$37 = typeof tmpUnaryArg$25;
$(tmpCalleeParam$37, `Math.SQRT2`);
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
+a;
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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Object_is
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Object_isFrozen
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Object_isSealed
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $String_fromCodePoint
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $String_raw
