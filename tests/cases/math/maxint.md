# Preval test case

# maxint.md

> Math > Maxint
>
>

## Input

`````js filename=intro
const n = 9007199254740993; // 2^53 + 1
$(n); // "9007199254740992"
$(n+1); // "9007199254740992"
$(n+3); // "9007199254740996"
`````


## Settled


`````js filename=intro
$(9007199254740992);
$(9007199254740992);
$(9007199254740996);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(9007199254740992);
$(9007199254740992);
$(9007199254740996);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 9007199254740992 );
$( 9007199254740992 );
$( 9007199254740996 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const n = 9007199254740992;
$(n);
let tmpCalleeParam = n + 1;
$(tmpCalleeParam);
let tmpCalleeParam$1 = n + 3;
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 9007199254740992
 - 2: 9007199254740992
 - 3: 9007199254740996
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
