# Preval test case

# var_write_read.md

> Assigns > Var write read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
$(1);
x = $(2); // This should become a constant
$(x, 'out');
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x, `out`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2), `out`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a, "out" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'out'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
