# Preval test case

# complex_callee.md

> Normalize > New > Complex callee
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

## Input

`````js filename=intro
$(new ($()));
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $();
const tmpCalleeParam /*:object*/ /*truthy*/ = new tmpNewCallee();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $();
$(new tmpNewCallee());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = new a();
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = $();
let tmpCalleeParam = new tmpNewCallee();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not a constructor ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
