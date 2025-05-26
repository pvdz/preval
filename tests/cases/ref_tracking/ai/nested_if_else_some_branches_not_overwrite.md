# Preval test case

# nested_if_else_some_branches_not_overwrite.md

> Ref tracking > Ai > Nested if else some branches not overwrite
>
> This test checks that if some branches of a nested if/else do not assign to x, the initial write is merged.

## Input

`````js filename=intro
let x = 1;
if (cond) {
  if (branch) {
    x = 2;
  }
  // else: does not assign to x
} else {
  x = 3;
}
$(x);
// Expected: x=1, x=2, and x=3 are possible for the final read.
`````


## Settled


`````js filename=intro
if (cond) {
  if (branch) {
    $(2);
  } else {
    $(1);
  }
} else {
  $(3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (cond) {
  if (branch) {
    $(2);
  } else {
    $(1);
  }
} else {
  $(3);
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
    $( 1 );
  }
}
else {
  $( 3 );
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
    $(x);
  }
} else {
  x = 3;
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
