# Preval test case

# recursive.md

> Assign hoisting > Recursive
>
> Note: this won't hoist because the recursive read means the write is not the second ref

## Input

`````js filename=intro
let x = 1;
x = x + 1; // assign hoisting should not make this the decl because that would introduce a tdz
$(x);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
x = x + 1;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
