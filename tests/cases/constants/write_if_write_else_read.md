# Preval test case

# write_if_write_else_read.md

> Constants > Write if write else read
>
> Ref tracking cases
>
> In this case the init is a Simple and can be moved inside

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  $(x);
}
`````


## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
} else {
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $($(2));
} else {
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 2 );
  $( a );
}
else {
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
