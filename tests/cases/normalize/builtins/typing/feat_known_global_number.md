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
const tmpEA1$5 /*:unknown*/ = $spy(`Number.parseInt`);
$coerce(tmpEA1$5, `string`);
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
