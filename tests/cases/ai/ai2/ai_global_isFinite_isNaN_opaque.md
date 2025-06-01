# Preval test case

# ai_global_isFinite_isNaN_opaque.md

> Ai > Ai2 > Ai global isFinite isNaN opaque
>
> Test: Global isFinite() and isNaN() with opaque values.

## Input

`````js filename=intro
// Expected: Calls are preserved with opaque arguments.
let val1 = $('finite_nan_val1', 123);
let val2 = $('finite_nan_val2', 'hello'); // will be NaN after coercion
let val3 = $('finite_nan_val3'); // completely opaque

$('isFinite_val1', isFinite(val1));
$('isNaN_val1', isNaN(val1));

$('isFinite_val2', isFinite(val2));
$('isNaN_val2', isNaN(val2));

$('isFinite_val3', isFinite(val3));
$('isNaN_val3', isNaN(val3));
`````


## Settled


`````js filename=intro
const val1 /*:unknown*/ = $(`finite_nan_val1`, 123);
const val2 /*:unknown*/ = $(`finite_nan_val2`, `hello`);
const val3 /*:unknown*/ = $(`finite_nan_val3`);
const tmpCalleeParam /*:boolean*/ = isFinite(val1);
$(`isFinite_val1`, tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = isNaN(val1);
$(`isNaN_val1`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:boolean*/ = isFinite(val2);
$(`isFinite_val2`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:boolean*/ = isNaN(val2);
$(`isNaN_val2`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:boolean*/ = isFinite(val3);
$(`isFinite_val3`, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:boolean*/ = isNaN(val3);
$(`isNaN_val3`, tmpCalleeParam$9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const val1 = $(`finite_nan_val1`, 123);
const val2 = $(`finite_nan_val2`, `hello`);
const val3 = $(`finite_nan_val3`);
$(`isFinite_val1`, isFinite(val1));
$(`isNaN_val1`, isNaN(val1));
$(`isFinite_val2`, isFinite(val2));
$(`isNaN_val2`, isNaN(val2));
$(`isFinite_val3`, isFinite(val3));
$(`isNaN_val3`, isNaN(val3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "finite_nan_val1", 123 );
const b = $( "finite_nan_val2", "hello" );
const c = $( "finite_nan_val3" );
const d = isFinite( a );
$( "isFinite_val1", d );
const e = isNaN( a );
$( "isNaN_val1", e );
const f = isFinite( b );
$( "isFinite_val2", f );
const g = isNaN( b );
$( "isNaN_val2", g );
const h = isFinite( c );
$( "isFinite_val3", h );
const i = isNaN( c );
$( "isNaN_val3", i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let val1 = $(`finite_nan_val1`, 123);
let val2 = $(`finite_nan_val2`, `hello`);
let val3 = $(`finite_nan_val3`);
let tmpCalleeParam = isFinite(val1);
$(`isFinite_val1`, tmpCalleeParam);
let tmpCalleeParam$1 = isNaN(val1);
$(`isNaN_val1`, tmpCalleeParam$1);
let tmpCalleeParam$3 = isFinite(val2);
$(`isFinite_val2`, tmpCalleeParam$3);
let tmpCalleeParam$5 = isNaN(val2);
$(`isNaN_val2`, tmpCalleeParam$5);
let tmpCalleeParam$7 = isFinite(val3);
$(`isFinite_val3`, tmpCalleeParam$7);
let tmpCalleeParam$9 = isNaN(val3);
$(`isNaN_val3`, tmpCalleeParam$9);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'finite_nan_val1', 123
 - 2: 'finite_nan_val2', 'hello'
 - 3: 'finite_nan_val3'
 - 4: 'isFinite_val1', false
 - 5: 'isNaN_val1', true
 - 6: 'isFinite_val2', false
 - 7: 'isNaN_val2', true
 - 8: 'isFinite_val3', false
 - 9: 'isNaN_val3', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
