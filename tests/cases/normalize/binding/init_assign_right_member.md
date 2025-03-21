# Preval test case

# init_assign_right_member.md

> Normalize > Binding > Init assign right member
>
> Should normalize assignment init to separate line

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b.x = c
`````


## Settled


`````js filename=intro
(10).x = 20;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(10).x = 20;
`````


## PST Settled
With rename=true

`````js filename=intro
10.x = 20;
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
