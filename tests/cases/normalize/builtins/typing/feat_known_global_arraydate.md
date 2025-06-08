# Preval test case

# feat_known_global_arraydate.md

> Normalize > Builtins > Typing > Feat known global arraydate
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

- array.from returns an array
- array.isArray returns a bool
- etc

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof Array.from($spy('Array.from')));
$(typeof Array.isArray($spy('Array.isArray')));
$(typeof Array.of($spy('Array.of')));
$(typeof Date.now($spy('Date.now')));
$(typeof Date.UTC($spy('Date.UTC')));
$(typeof Date.parse($spy('Date.parse')));
$(typeof JSON.stringify($spy('JSON.stringify')));
$(typeof Math.abs($spy('Math.abs')));
$(typeof Math.acos($spy('Math.acos')));
$(typeof Math.acosh($spy('Math.acosh')));
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $spy(`Array.from`);
$Array_from(tmpMCP);
$(`object`);
$spy(`Array.isArray`);
$(`boolean`);
$spy(`Array.of`);
$(`object`);
$spy(`Date.now`);
$(`number`);
const tmpMCP$7 /*:unknown*/ = $spy(`Date.UTC`);
$coerce(tmpMCP$7, `number`);
$(`number`);
const tmpMCP$9 /*:unknown*/ = $spy(`Date.parse`);
$coerce(tmpMCP$9, `string`);
$(`number`);
const tmpMCP$11 /*:unknown*/ = $spy(`JSON.stringify`);
const tmpUnaryArg$11 /*:primitive*/ = $JSON_stringify(tmpMCP$11);
const tmpCalleeParam$11 /*:string*/ /*truthy*/ = typeof tmpUnaryArg$11;
$(tmpCalleeParam$11);
const tmpMCP$13 /*:unknown*/ = $spy(`Math.abs`);
$coerce(tmpMCP$13, `number`);
$(`number`);
const tmpMCP$15 /*:unknown*/ = $spy(`Math.acos`);
$coerce(tmpMCP$15, `number`);
$(`number`);
const tmpMCP$17 /*:unknown*/ = $spy(`Math.acosh`);
$coerce(tmpMCP$17, `number`);
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Array_from($spy(`Array.from`));
$(`object`);
$spy(`Array.isArray`);
$(`boolean`);
$spy(`Array.of`);
$(`object`);
$spy(`Date.now`);
$(`number`);
$coerce($spy(`Date.UTC`), `number`);
$(`number`);
$coerce($spy(`Date.parse`), `string`);
$(`number`);
const tmpUnaryArg$11 = $JSON_stringify($spy(`JSON.stringify`));
$(typeof tmpUnaryArg$11);
$coerce($spy(`Math.abs`), `number`);
$(`number`);
$coerce($spy(`Math.acos`), `number`);
$(`number`);
$coerce($spy(`Math.acosh`), `number`);
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "Array.from" );
$Array_from( a );
$( "object" );
$spy( "Array.isArray" );
$( "boolean" );
$spy( "Array.of" );
$( "object" );
$spy( "Date.now" );
$( "number" );
const b = $spy( "Date.UTC" );
$coerce( b, "number" );
$( "number" );
const c = $spy( "Date.parse" );
$coerce( c, "string" );
$( "number" );
const d = $spy( "JSON.stringify" );
const e = $JSON_stringify( d );
const f = typeof e;
$( f );
const g = $spy( "Math.abs" );
$coerce( g, "number" );
$( "number" );
const h = $spy( "Math.acos" );
$coerce( h, "number" );
$( "number" );
const i = $spy( "Math.acosh" );
$coerce( i, "number" );
$( "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Array_from;
const tmpMCP = $spy(`Array.from`);
const tmpUnaryArg = $dotCall(tmpMCF, $array_constructor, `from`, tmpMCP);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpMCF$1 = $Array_isArray;
const tmpMCP$1 = $spy(`Array.isArray`);
const tmpUnaryArg$1 = $dotCall(tmpMCF$1, $array_constructor, `isArray`, tmpMCP$1);
let tmpCalleeParam$1 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$1);
const tmpMCF$3 = $Array_of;
const tmpMCP$3 = $spy(`Array.of`);
const tmpUnaryArg$3 = $dotCall(tmpMCF$3, $array_constructor, `of`, tmpMCP$3);
let tmpCalleeParam$3 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$3);
const tmpMCF$5 = $Date_now;
const tmpMCP$5 = $spy(`Date.now`);
const tmpUnaryArg$5 = $dotCall(tmpMCF$5, $date_constructor, `now`, tmpMCP$5);
let tmpCalleeParam$5 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$5);
const tmpMCF$7 = $Date_UTC;
const tmpMCP$7 = $spy(`Date.UTC`);
const tmpUnaryArg$7 = $dotCall(tmpMCF$7, $date_constructor, `UTC`, tmpMCP$7);
let tmpCalleeParam$7 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$7);
const tmpMCF$9 = $Date_parse;
const tmpMCP$9 = $spy(`Date.parse`);
const tmpUnaryArg$9 = $dotCall(tmpMCF$9, $date_constructor, `parse`, tmpMCP$9);
let tmpCalleeParam$9 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$9);
const tmpMCF$11 = $JSON_stringify;
const tmpMCP$11 = $spy(`JSON.stringify`);
const tmpUnaryArg$11 = $dotCall(tmpMCF$11, JSON, `stringify`, tmpMCP$11);
let tmpCalleeParam$11 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$11);
const tmpMCF$13 = $Math_abs;
const tmpMCP$13 = $spy(`Math.abs`);
const tmpUnaryArg$13 = $dotCall(tmpMCF$13, Math, `abs`, tmpMCP$13);
let tmpCalleeParam$13 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$13);
const tmpMCF$15 = $Math_acos;
const tmpMCP$15 = $spy(`Math.acos`);
const tmpUnaryArg$15 = $dotCall(tmpMCF$15, Math, `acos`, tmpMCP$15);
let tmpCalleeParam$15 = typeof tmpUnaryArg$15;
$(tmpCalleeParam$15);
const tmpMCF$17 = $Math_acosh;
const tmpMCP$17 = $spy(`Math.acosh`);
const tmpUnaryArg$17 = $dotCall(tmpMCF$17, Math, `acosh`, tmpMCP$17);
let tmpCalleeParam$17 = typeof tmpUnaryArg$17;
$(tmpCalleeParam$17);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_from
- (todo) type trackeed tricks can possibly support static $Array_isArray
- (todo) type trackeed tricks can possibly support static $Array_of
- (todo) type trackeed tricks can possibly support static $Date_UTC
- (todo) type trackeed tricks can possibly support static $Date_now
- (todo) type trackeed tricks can possibly support static $Date_parse
- (todo) type trackeed tricks can possibly support static $JSON_stringify
- (todo) type trackeed tricks can possibly support static $Math_abs
- (todo) type trackeed tricks can possibly support static $Math_acos
- (todo) type trackeed tricks can possibly support static $Math_acosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['Array.from', 'Array.from']
 - 2: 'object'
 - 3: 'Creating spy', 2, 1, ['Array.isArray', 'Array.isArray']
 - 4: 'boolean'
 - 5: 'Creating spy', 3, 1, ['Array.of', 'Array.of']
 - 6: 'object'
 - 7: 'Creating spy', 4, 1, ['Date.now', 'Date.now']
 - 8: 'number'
 - 9: 'Creating spy', 5, 1, ['Date.UTC', 'Date.UTC']
 - 10: '$spy[5].valueOf()', 'Date.UTC'
 - 11: 'number'
 - 12: 'Creating spy', 6, 1, ['Date.parse', 'Date.parse']
 - 13: '$spy[6].toString()', 'Date.parse'
 - 14: 'number'
 - 15: 'Creating spy', 7, 1, ['JSON.stringify', 'JSON.stringify']
 - 16: 'string'
 - 17: 'Creating spy', 8, 1, ['Math.abs', 'Math.abs']
 - 18: '$spy[8].valueOf()', 'Math.abs'
 - 19: 'number'
 - 20: 'Creating spy', 9, 1, ['Math.acos', 'Math.acos']
 - 21: '$spy[9].valueOf()', 'Math.acos'
 - 22: 'number'
 - 23: 'Creating spy', 10, 1, ['Math.acosh', 'Math.acosh']
 - 24: '$spy[10].valueOf()', 'Math.acosh'
 - 25: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
