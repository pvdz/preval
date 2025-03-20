# Preval test case

# yes__nested_levels.md

> Binding > Promote const > Yes  nested levels
>
> Test block occurrence matching

All reads of x appear on the same level or nested from the only write (beyond the decl) and in the same scope.

This means x be safely made into a constant.

## Input

`````js filename=intro
var x;
if ($(1)) {
  x = 10;
  if ($(2)) {
    if ($(3)) {
      $(x);
    }
  }
  $(x);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    const tmpIfTest$3 /*:unknown*/ = $(3);
    $(10);
    if (tmpIfTest$3) {
      $(10);
    } else {
    }
  } else {
    $(10);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if ($(2)) {
    const tmpIfTest$3 = $(3);
    $(10);
    if (tmpIfTest$3) {
      $(10);
    }
  } else {
    $(10);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  if (b) {
    const c = $( 3 );
    $( 10 );
    if (c) {
      $( 10 );
    }
  }
  else {
    $( 10 );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 10
 - 5: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
