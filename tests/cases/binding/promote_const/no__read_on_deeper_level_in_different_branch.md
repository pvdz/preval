# Preval test case

# no__read_on_deeper_level_in_different_branch.md

> Binding > Promote const > No  read on deeper level in different branch
>
> Confirm that we properly deal with a read of a var binding that occurs in a different branch from the assignment.

This proofs that we can't get away with only tracking the lowest depth count + block pid for validation purposes. We need to track the entire block stack for each binding to validate the ancestry.

The x should not be made a constant.

## Input

`````js filename=intro
var x;
if ($(1)) {
  if ($(2)) {
    x = 10;
  }
  if ($(3)) {
    if ($(4)) {
      $(x);
    }
  }
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  let x /*:primitive*/ = undefined;
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    x = 10;
  } else {
  }
  const tmpIfTest$3 /*:unknown*/ = $(3);
  if (tmpIfTest$3) {
    const tmpIfTest$5 /*:unknown*/ = $(4);
    if (tmpIfTest$5) {
      $(x);
    } else {
    }
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let x = undefined;
  if ($(2)) {
    x = 10;
  }
  if ($(3)) {
    if ($(4)) {
      $(x);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  let b = undefined;
  const c = $( 2 );
  if (c) {
    b = 10;
  }
  const d = $( 3 );
  if (d) {
    const e = $( 4 );
    if (e) {
      $( b );
    }
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
