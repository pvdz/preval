# Preval test case

# ai_self_assignment_ident.md

> Ai > Ai1 > Ai self assignment ident
>
> Test: Simplification of x = x (self-assignment of a simple identifier).

## Input

`````js filename=intro
// Expected: let x = $("A"); $("B", x);
let x = $("A");
x = x; // This self-assignment should be a no-op and removed
$("B", x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`A`);
$(`B`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`B`, $(`A`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "A" );
$( "B", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`A`);
$(`B`, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'B', 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
