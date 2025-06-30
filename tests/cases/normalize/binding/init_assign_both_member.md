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
const tmpInitAssignLhsComputedRhs /*:unknown*/ = $Number_prototype.x;
(10).x = tmpInitAssignLhsComputedRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedRhs = $Number_prototype.x;
(10).x = tmpInitAssignLhsComputedRhs;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
10.x = a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 10;
let c = 20;
const tmpInitAssignLhsComputedRhs = c.x;
b.x = tmpInitAssignLhsComputedRhs;
let a = tmpInitAssignLhsComputedRhs;
`````


## Todos triggered


- (todo) trying to assign to a property of a primitive, indication of preval issue?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot create property 'x' on number '10' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
