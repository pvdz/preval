# Preval test case

# var_write_func_expr_read.md

> Assigns > Var write func expr read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
$(1);
x = $(2); // This should become a constant because we know the x won't be read before this assign
const f = function() { $(x, 'f'); }
f();
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x, `f`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2), `f`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a, "f" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
