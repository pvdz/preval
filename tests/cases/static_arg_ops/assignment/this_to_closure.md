# Preval test case

# this_to_closure.md

> Static arg ops > Assignment > This to closure
>
> This was detected as closure to closure

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = this);
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
