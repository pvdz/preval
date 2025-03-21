# Preval test case

# eliminating_unused_var_with_reads.md

> Assigns > Eliminating unused var with reads
>
> Trying to create a test case with a variable that is unused but has a read for another variable.

## Input

`````js filename=intro
let x = $('unknown 1');
let z = $('unknown 2'); // This is dropped after `unused` is dropped
$(x);
let unused = x + z; // Can't eliminate the init, can't reduce it further, won't inline it. But the binding is unused so the decl is removed.
x = $('unknown 3'); // This has to be made a constant in the first cycle. The unused binding would be eliminated in the same cycle.
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`unknown 1`);
const z /*:unknown*/ = $(`unknown 2`);
$(x);
x + z;
const tmpClusterSSA_x /*:unknown*/ = $(`unknown 3`);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`unknown 1`);
const z = $(`unknown 2`);
$(x);
x + z;
$($(`unknown 3`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "unknown 1" );
const b = $( "unknown 2" );
$( a );
a + b;
const c = $( "unknown 3" );
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'unknown 1'
 - 2: 'unknown 2'
 - 3: 'unknown 1'
 - 4: 'unknown 3'
 - 5: 'unknown 3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
