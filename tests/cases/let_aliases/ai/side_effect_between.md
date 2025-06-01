# Preval test case

# side_effect_between.md

> Let aliases > Ai > Side effect between
>
> Side effect between const aliases should prevent aliasing

## Input

`````js filename=intro
let x = $("val");
const a = x;
foo(); // unknown function, could have side effects
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
foo();
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
foo();
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
foo();
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
foo();
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

foo


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
