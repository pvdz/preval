# Preval test case

# assign_simple_simple_simple.md

> Logical > Or > Assign simple simple simple
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = 1 || 2);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
x = 1;
if (x) {
} else {
  x = 2;
}
let tmpCalleeParam = x;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
