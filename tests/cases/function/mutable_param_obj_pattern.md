# Preval test case

# mutable_param_obj_pattern.md

> Function > Mutable param obj pattern
>
> Param names can be written to

## Input

`````js filename=intro
function f({x: a}) {
  a = $(10);
  return a;
}
$(f({x: 1}));
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
