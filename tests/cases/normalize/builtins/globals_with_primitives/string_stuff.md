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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $coerce($Number_POSITIVE_INFINITY, `string`);
$(tmpCalleeParam);
let tmpCalleeParam$1 = $coerce(-Infinity, `string`);
$(tmpCalleeParam$1);
let tmpCalleeParam$5 = $Number_NaN;
let tmpCalleeParam$3 = $coerce($Number_NaN, `string`);
$(tmpCalleeParam$3);
let tmpCalleeParam$9 = $Number_POSITIVE_INFINITY;
let tmpCalleeParam$7 = $coerce($Number_POSITIVE_INFINITY, `string`);
$(tmpCalleeParam$7);
let tmpCalleeParam$13 = $Number_NEGATIVE_INFINITY;
let tmpCalleeParam$11 = $coerce($Number_NEGATIVE_INFINITY, `string`);
$(tmpCalleeParam$11);
let tmpCalleeParam$17 = $Number_MAX_SAFE_INTEGER;
let tmpCalleeParam$15 = $coerce($Number_MAX_SAFE_INTEGER, `string`);
$(tmpCalleeParam$15);
let tmpCalleeParam$21 = $Number_MIN_SAFE_INTEGER;
let tmpCalleeParam$19 = $coerce($Number_MIN_SAFE_INTEGER, `string`);
$(tmpCalleeParam$19);
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
