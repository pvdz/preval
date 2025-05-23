# Preval test case

# multiple_var_no_init.md

> Normalize > Var > Multiple var no init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

## Input

`````js filename=intro
var a, b, c

$(a);
$(b);
$(c);
`````


## Settled


`````js filename=intro
$(undefined);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
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
 - 1: undefined
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
