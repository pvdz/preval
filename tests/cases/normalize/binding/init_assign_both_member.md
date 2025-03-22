# Preval test case

# init_assign_both_member.md

> Normalize > Binding > Init assign both member
>
> Should normalize assignment init to separate line

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b.x = c.x
`````


## Settled


`````js filename=intro
const varInitAssignLhsComputedRhs /*:unknown*/ = (20).x;
(10).x = varInitAssignLhsComputedRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedRhs = (20).x;
(10).x = varInitAssignLhsComputedRhs;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = (20).x;
10.x = a;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot create property 'x' on number '10' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
