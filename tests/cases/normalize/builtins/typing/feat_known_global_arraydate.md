# Preval test case

# feat_known_global_arraydate.md

> Normalize > Builtins > Typing > Feat known global arraydate
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

- array.from returns an array
- array.isArray returns a bool
- etc

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
const tmpCalleeParam$1 /*:unknown*/ = $spy(`Array.from`);
$Array_from(tmpCalleeParam$1);
$(`object`);
$spy(`Array.isArray`);
$(`boolean`);
$spy(`Array.of`);
$(`object`);
$spy(`Date.now`);
$(`number`);
const tmpCalleeParam$17 /*:unknown*/ = $spy(`Date.UTC`);
+tmpCalleeParam$17;
$(`number`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`Date.parse`);
$coerce(tmpCalleeParam$21, `string`);
$(`number`);
const tmpCalleeParam$25 /*:unknown*/ = $spy(`JSON.stringify`);
const tmpUnaryArg$11 /*:primitive*/ = $JSON_stringify(tmpCalleeParam$25);
const tmpCalleeParam$23 /*:string*/ = typeof tmpUnaryArg$11;
$(tmpCalleeParam$23);
const tmpCalleeParam$29 /*:unknown*/ = $spy(`Math.abs`);
$coerce(tmpCalleeParam$29, `number`);
$(`number`);
const tmpCalleeParam$33 /*:unknown*/ = $spy(`Math.acos`);
$coerce(tmpCalleeParam$33, `number`);
$(`number`);
const tmpCalleeParam$37 /*:unknown*/ = $spy(`Math.acosh`);
$coerce(tmpCalleeParam$37, `number`);
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
const tmpCalleeParam$17 = $spy(`Date.UTC`);
+tmpCalleeParam$17;
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

## Pre Normal


`````js filename=intro
$(typeof Array.from($spy(`Array.from`)));
$(typeof Array.isArray($spy(`Array.isArray`)));
$(typeof Array.of($spy(`Array.of`)));
$(typeof Date.now($spy(`Date.now`)));
$(typeof Date.UTC($spy(`Date.UTC`)));
$(typeof Date.parse($spy(`Date.parse`)));
$(typeof JSON.stringify($spy(`JSON.stringify`)));
$(typeof Math.abs($spy(`Math.abs`)));
$(typeof Math.acos($spy(`Math.acos`)));
$(typeof Math.acosh($spy(`Math.acosh`)));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = $spy(`Array.from`);
const tmpUnaryArg = $Array_from(tmpCalleeParam$1);
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpCalleeParam$5 = $spy(`Array.isArray`);
const tmpUnaryArg$1 = $Array_isArray(tmpCalleeParam$5);
const tmpCalleeParam$3 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$3);
const tmpCalleeParam$9 = $spy(`Array.of`);
const tmpUnaryArg$3 = $Array_of(tmpCalleeParam$9);
const tmpCalleeParam$7 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$7);
const tmpCalleeParam$13 = $spy(`Date.now`);
const tmpUnaryArg$5 = $Date_now(tmpCalleeParam$13);
const tmpCalleeParam$11 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$11);
const tmpCalleeParam$17 = $spy(`Date.UTC`);
const tmpUnaryArg$7 = $Date_UTC(tmpCalleeParam$17);
const tmpCalleeParam$15 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$15);
const tmpCalleeParam$21 = $spy(`Date.parse`);
const tmpUnaryArg$9 = $Date_parse(tmpCalleeParam$21);
const tmpCalleeParam$19 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$19);
const tmpCalleeParam$25 = $spy(`JSON.stringify`);
const tmpUnaryArg$11 = $JSON_stringify(tmpCalleeParam$25);
const tmpCalleeParam$23 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$23);
const tmpCalleeParam$29 = $spy(`Math.abs`);
const tmpUnaryArg$13 = $Math_abs(tmpCalleeParam$29);
const tmpCalleeParam$27 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$27);
const tmpCalleeParam$33 = $spy(`Math.acos`);
const tmpUnaryArg$15 = $Math_acos(tmpCalleeParam$33);
const tmpCalleeParam$31 = typeof tmpUnaryArg$15;
$(tmpCalleeParam$31);
const tmpCalleeParam$37 = $spy(`Math.acosh`);
const tmpUnaryArg$17 = $Math_acosh(tmpCalleeParam$37);
const tmpCalleeParam$35 = typeof tmpUnaryArg$17;
$(tmpCalleeParam$35);
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
+b;
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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Array_from
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Array_isArray
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Array_of
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Date_now
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Date_UTC
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Date_parse
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $JSON_stringify
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Math_abs
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Math_acos
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Math_acosh
