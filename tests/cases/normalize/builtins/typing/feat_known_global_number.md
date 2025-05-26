# Preval test case

# feat_known_global_number.md

> Normalize > Builtins > Typing > Feat known global number
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof isNaN($spy('isNaN')));
$(typeof isFinite($spy('isFinite')));
$(typeof Number.isFinite($spy('Number.isFinite')));
$(typeof Number.isInteger($spy('Number.isInteger')));
$(typeof Number.isNaN($spy('Number.isNaN')));
$(typeof Number.isSafeInteger($spy('Number.isSafeInteger')));
$(typeof Number.parseFloat($spy('Number.parseFloat')));
$(typeof Number.parseInt($spy('Number.parseInt')));
$(typeof Number.EPSILON, 'Number.EPSILON');
$(typeof Number.MAX_VALUE, 'Number.MAX_VALUE');
$(typeof Number.MIN_VALUE, 'Number.MIN_VALUE');
$(typeof Number.NEGATIVE_INFINITY, 'Number.NEGATIVE_INFINITY');
$(typeof Number.POSITIVE_INFINITY, 'Number.POSITIVE_INFINITY');
$(typeof Number.NaN, 'Number.NaN');
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $spy(`isNaN`);
$coerce(tmpCalleeParam$1, `number`);
$(`boolean`);
const tmpCalleeParam$5 /*:unknown*/ = $spy(`isFinite`);
$coerce(tmpCalleeParam$5, `number`);
$(`boolean`);
$spy(`Number.isFinite`);
$(`boolean`);
$spy(`Number.isInteger`);
$(`boolean`);
$spy(`Number.isNaN`);
$(`boolean`);
$spy(`Number.isSafeInteger`);
$(`boolean`);
const tmpMCP$7 /*:unknown*/ = $spy(`Number.parseFloat`);
$coerce(tmpMCP$7, `string`);
$(`number`);
const tmpMCP$9 /*:unknown*/ = $spy(`Number.parseInt`);
$coerce(tmpMCP$9, `string`);
$(`number`);
$(`number`, `Number.EPSILON`);
$(`number`, `Number.MAX_VALUE`);
$(`number`, `Number.MIN_VALUE`);
$(`number`, `Number.NEGATIVE_INFINITY`);
$(`number`, `Number.POSITIVE_INFINITY`);
$(`number`, `Number.NaN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(`isNaN`), `number`);
$(`boolean`);
$coerce($spy(`isFinite`), `number`);
$(`boolean`);
$spy(`Number.isFinite`);
$(`boolean`);
$spy(`Number.isInteger`);
$(`boolean`);
$spy(`Number.isNaN`);
$(`boolean`);
$spy(`Number.isSafeInteger`);
$(`boolean`);
$coerce($spy(`Number.parseFloat`), `string`);
$(`number`);
$coerce($spy(`Number.parseInt`), `string`);
$(`number`);
$(`number`, `Number.EPSILON`);
$(`number`, `Number.MAX_VALUE`);
$(`number`, `Number.MIN_VALUE`);
$(`number`, `Number.NEGATIVE_INFINITY`);
$(`number`, `Number.POSITIVE_INFINITY`);
$(`number`, `Number.NaN`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "isNaN" );
$coerce( a, "number" );
$( "boolean" );
const b = $spy( "isFinite" );
$coerce( b, "number" );
$( "boolean" );
$spy( "Number.isFinite" );
$( "boolean" );
$spy( "Number.isInteger" );
$( "boolean" );
$spy( "Number.isNaN" );
$( "boolean" );
$spy( "Number.isSafeInteger" );
$( "boolean" );
const c = $spy( "Number.parseFloat" );
$coerce( c, "string" );
$( "number" );
const d = $spy( "Number.parseInt" );
$coerce( d, "string" );
$( "number" );
$( "number", "Number.EPSILON" );
$( "number", "Number.MAX_VALUE" );
$( "number", "Number.MIN_VALUE" );
$( "number", "Number.NEGATIVE_INFINITY" );
$( "number", "Number.POSITIVE_INFINITY" );
$( "number", "Number.NaN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = $spy(`isNaN`);
const tmpUnaryArg = isNaN(tmpCalleeParam$1);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
let tmpCalleeParam$5 = $spy(`isFinite`);
const tmpUnaryArg$1 = isFinite(tmpCalleeParam$5);
let tmpCalleeParam$3 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$3);
const tmpMCF = $Number_isFinite;
const tmpMCP = $spy(`Number.isFinite`);
const tmpUnaryArg$3 = $dotCall(tmpMCF, $number_constructor, `isFinite`, tmpMCP);
let tmpCalleeParam$7 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$7);
const tmpMCF$1 = $Number_isInteger;
const tmpMCP$1 = $spy(`Number.isInteger`);
const tmpUnaryArg$5 = $dotCall(tmpMCF$1, $number_constructor, `isInteger`, tmpMCP$1);
let tmpCalleeParam$9 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$9);
const tmpMCF$3 = $Number_isNaN;
const tmpMCP$3 = $spy(`Number.isNaN`);
const tmpUnaryArg$7 = $dotCall(tmpMCF$3, $number_constructor, `isNaN`, tmpMCP$3);
let tmpCalleeParam$11 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$11);
const tmpMCF$5 = $Number_isSafeInteger;
const tmpMCP$5 = $spy(`Number.isSafeInteger`);
const tmpUnaryArg$9 = $dotCall(tmpMCF$5, $number_constructor, `isSafeInteger`, tmpMCP$5);
let tmpCalleeParam$13 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$13);
const tmpMCF$7 = $Number_parseFloat;
const tmpMCP$7 = $spy(`Number.parseFloat`);
const tmpUnaryArg$11 = $dotCall(tmpMCF$7, $number_constructor, `parseFloat`, tmpMCP$7);
let tmpCalleeParam$15 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$15);
const tmpMCF$9 = $Number_parseInt;
const tmpMCP$9 = $spy(`Number.parseInt`);
const tmpUnaryArg$13 = $dotCall(tmpMCF$9, $number_constructor, `parseInt`, tmpMCP$9);
let tmpCalleeParam$17 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$17);
const tmpUnaryArg$15 = $Number_EPSILON;
let tmpCalleeParam$19 = typeof tmpUnaryArg$15;
$(tmpCalleeParam$19, `Number.EPSILON`);
const tmpUnaryArg$17 = $Number_MAX_VALUE;
let tmpCalleeParam$21 = typeof tmpUnaryArg$17;
$(tmpCalleeParam$21, `Number.MAX_VALUE`);
const tmpUnaryArg$19 = $Number_MIN_VALUE;
let tmpCalleeParam$23 = typeof tmpUnaryArg$19;
$(tmpCalleeParam$23, `Number.MIN_VALUE`);
const tmpUnaryArg$21 = $Number_NEGATIVE_INFINITY;
let tmpCalleeParam$25 = typeof tmpUnaryArg$21;
$(tmpCalleeParam$25, `Number.NEGATIVE_INFINITY`);
const tmpUnaryArg$23 = $Number_POSITIVE_INFINITY;
let tmpCalleeParam$27 = typeof tmpUnaryArg$23;
$(tmpCalleeParam$27, `Number.POSITIVE_INFINITY`);
const tmpUnaryArg$25 = $Number_NaN;
let tmpCalleeParam$29 = typeof tmpUnaryArg$25;
$(tmpCalleeParam$29, `Number.NaN`);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_isFinite
- (todo) type trackeed tricks can possibly support static $Number_isInteger
- (todo) type trackeed tricks can possibly support static $Number_isNaN
- (todo) type trackeed tricks can possibly support static $Number_isSafeInteger
- (todo) type trackeed tricks can possibly support static $Number_parseFloat
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['isNaN', 'isNaN']
 - 2: '$spy[1].valueOf()', 'isNaN'
 - 3: 'boolean'
 - 4: 'Creating spy', 2, 1, ['isFinite', 'isFinite']
 - 5: '$spy[2].valueOf()', 'isFinite'
 - 6: 'boolean'
 - 7: 'Creating spy', 3, 1, ['Number.isFinite', 'Number.isFinite']
 - 8: 'boolean'
 - 9: 'Creating spy', 4, 1, ['Number.isInteger', 'Number.isInteger']
 - 10: 'boolean'
 - 11: 'Creating spy', 5, 1, ['Number.isNaN', 'Number.isNaN']
 - 12: 'boolean'
 - 13: 'Creating spy', 6, 1, ['Number.isSafeInteger', 'Number.isSafeInteger']
 - 14: 'boolean'
 - 15: 'Creating spy', 7, 1, ['Number.parseFloat', 'Number.parseFloat']
 - 16: '$spy[7].toString()', 'Number.parseFloat'
 - 17: 'number'
 - 18: 'Creating spy', 8, 1, ['Number.parseInt', 'Number.parseInt']
 - 19: '$spy[8].toString()', 'Number.parseInt'
 - 20: 'number'
 - 21: 'number', 'Number.EPSILON'
 - 22: 'number', 'Number.MAX_VALUE'
 - 23: 'number', 'Number.MIN_VALUE'
 - 24: 'number', 'Number.NEGATIVE_INFINITY'
 - 25: 'number', 'Number.POSITIVE_INFINITY'
 - 26: 'number', 'Number.NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
