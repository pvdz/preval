# Preval test case

# isnan_stuff.md

> Normalize > Builtins > Globals with primitives > Isnan stuff
>
> Calling isNaN on a value that is a NaN should invariantly return true

## Input

`````js filename=intro
$(isNaN(Number.NaN));
$(isNaN(Number.POSITIVE_INFINITY));
$(isNaN(Number.NEGATIVE_INFINITY));
$(isNaN(Number.MAX_SAFE_INTEGER));
$(isNaN(Number.MIN_SAFE_INTEGER));
`````


## Settled


`````js filename=intro
$(true);
$(false);
$(false);
$(false);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(false);
$(false);
$(false);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( false );
$( false );
$( false );
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = $Number_NaN;
let tmpCalleeParam = true;
$(tmpCalleeParam);
let tmpCalleeParam$5 = $Number_POSITIVE_INFINITY;
let tmpCalleeParam$3 = false;
$(tmpCalleeParam$3);
let tmpCalleeParam$9 = $Number_NEGATIVE_INFINITY;
let tmpCalleeParam$7 = false;
$(tmpCalleeParam$7);
let tmpCalleeParam$13 = $Number_MAX_SAFE_INTEGER;
let tmpCalleeParam$11 = false;
$(tmpCalleeParam$11);
let tmpCalleeParam$17 = $Number_MIN_SAFE_INTEGER;
let tmpCalleeParam$15 = false;
$(tmpCalleeParam$15);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: false
 - 4: false
 - 5: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
