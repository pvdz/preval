# Preval test case

# cross_scope.md

> Let aliases > Ai > Cross scope
>
> Let aliasing with consts in different blocks

## Input

`````js filename=intro
let x = $(1);
if ($) {
  const a = x;
  $(a);
} else {
  const b = x;
  $(b);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
if ($) {
  const a = x;
  $(x);
} else {
  const b = x;
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
