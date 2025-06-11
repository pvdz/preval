# Preval test case

# number_max_safe_integer.md

> Math > Ai > Number max safe integer
>
> Number.MAX_SAFE_INTEGER and overflow

## Input

`````js filename=intro
const a = $(Number.MAX_SAFE_INTEGER);
const b = a + 1;
const c = a + 2;
$(a);
$(b);
$(c);
// Should be 9007199254740991, 9007199254740992, 9007199254740992
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_MAX_SAFE_INTEGER);
const b /*:primitive*/ = a + 1;
const c /*:primitive*/ = a + 2;
$(a);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_MAX_SAFE_INTEGER);
const b = a + 1;
const c = a + 2;
$(a);
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_MAX_SAFE_INTEGER );
const b = a + 1;
const c = a + 2;
$( a );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Number_MAX_SAFE_INTEGER;
const a = $($Number_MAX_SAFE_INTEGER);
const b = a + 1;
const c = a + 2;
$(a);
$(b);
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 9007199254740991
 - 2: 9007199254740991
 - 3: 9007199254740992
 - 4: 9007199254740992
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
