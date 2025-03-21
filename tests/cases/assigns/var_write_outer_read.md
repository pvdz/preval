# Preval test case

# var_write_outer_read.md

> Assigns > Var write outer read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
{
  var x;
  $(1);
  x = $(2); // This should become a constant because the block will get eliminated
  $(x, 'b');
}
$(x);
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x, `b`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const x = $(2);
$(x, `b`);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a, "b" );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'b'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
