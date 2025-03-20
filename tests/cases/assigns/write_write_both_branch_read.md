# Preval test case

# write_write_both_branch_read.md

> Assigns > Write write both branch read
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
if ($(10)) x = $(2);
else x = $(3);
$(x);
`````


## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(10);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(3);
  $(tmpClusterSSA_x$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($(10)) {
  $($(2));
} else {
  $($(3));
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 10 );
if (a) {
  const b = $( 2 );
  $( b );
}
else {
  const c = $( 3 );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
