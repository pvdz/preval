# Preval test case

# string_stuff.md

> Normalize > Builtins > Globals with primitives > String stuff
>
> Calling isNaN on a value that is a NaN should invariantly return true

## Input

`````js filename=intro
$(String(Infinity));
$(String(-Infinity));
$(String(Number.NaN));
$(String(Number.POSITIVE_INFINITY));
$(String(Number.NEGATIVE_INFINITY));
$(String(Number.MAX_SAFE_INTEGER));
$(String(Number.MIN_SAFE_INTEGER));
`````


## Settled


`````js filename=intro
$(`Infinity`);
$(`-Infinity`);
$(`NaN`);
$(`Infinity`);
$(`-Infinity`);
$(`9007199254740991`);
$(`-9007199254740991`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Infinity`);
$(`-Infinity`);
$(`NaN`);
$(`Infinity`);
$(`-Infinity`);
$(`9007199254740991`);
$(`-9007199254740991`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "Infinity" );
$( "-Infinity" );
$( "NaN" );
$( "Infinity" );
$( "-Infinity" );
$( "9007199254740991" );
$( "-9007199254740991" );
`````


## Todos triggered


- (todo) Support coercing "$Number_MAX_SAFE_INTEGER" to a "string"
- (todo) Support coercing "$Number_MIN_SAFE_INTEGER" to a "string"
- (todo) Support coercing "$Number_NEGATIVE_INFINITY" to a "string"
- (todo) Support coercing "$Number_NaN" to a "string"
- (todo) Support coercing "$Number_POSITIVE_INFINITY" to a "string"


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Infinity'
 - 2: '-Infinity'
 - 3: 'NaN'
 - 4: 'Infinity'
 - 5: '-Infinity'
 - 6: '9007199254740991'
 - 7: '-9007199254740991'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
