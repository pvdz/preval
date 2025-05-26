# Preval test case

# nested_if_else_all_branches_overwrite_longer.md

> Ref tracking > Ai > Nested if else all branches overwrite longer
>
> This test checks that if all branches of a nested if/else assign to x, the initial write is pruned.

## Input

`````js filename=intro
let x = 1;
if (cond) {
  if (branch) {
    x = 2;
  } else {
    x = 3;
  }
} else {
  x = 4;
}
$(x);
// Expected: Only x=2, x=3, and x=4 are possible for the final read.
`````


## Settled


`````js filename=intro
if (cond) {
  if (branch) {
    $(2);
  } else {
    $(3);
  }
} else {
  $(4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (cond) {
  if (branch) {
    $(2);
  } else {
    $(3);
  }
} else {
  $(4);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (cond) {
  if (branch) {
    $( 2 );
  }
  else {
    $( 3 );
  }
}
else {
  $( 4 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
if (cond) {
  if (branch) {
    x = 2;
    $(x);
  } else {
    x = 3;
    $(x);
  }
} else {
  x = 4;
  $(x);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

cond, branch


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
