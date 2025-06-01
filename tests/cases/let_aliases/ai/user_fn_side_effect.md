# Preval test case

# user_fn_side_effect.md

> Let aliases > Ai > User fn side effect
>
> Call to a user-defined function with unknown side effects (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
maybeSideEffect();
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
maybeSideEffect();
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
maybeSideEffect();
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
maybeSideEffect();
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
maybeSideEffect();
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

maybeSideEffect


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
