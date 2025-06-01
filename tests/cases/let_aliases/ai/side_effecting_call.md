# Preval test case

# side_effecting_call.md

> Let aliases > Ai > Side effecting call
>
> Known side-effecting function call between aliases (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
alert("side effect");
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
alert(`side effect`);
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
alert(`side effect`);
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
alert( "side effect" );
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
alert(`side effect`);
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

alert


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
