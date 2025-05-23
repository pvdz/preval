# Preval test case

# no__multiple_levels.md

> Binding > Promote const > No  multiple levels
>
> Test block occurrence matching

Can not promote x to a constant.

## Input

`````js filename=intro
var x;
if ($(1)) {
  x = 10;
}
if ($(2)) {
  if ($(3)) {
    // Should not confuse this occurrence as being "nested" in the assignment block
    $(x);
  }
}
`````


## Settled


`````js filename=intro
let x /*:primitive*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  x = 10;
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(2);
if (tmpIfTest$1) {
  const tmpIfTest$3 /*:unknown*/ = $(3);
  if (tmpIfTest$3) {
    $(x);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
if ($(1)) {
  x = 10;
}
if ($(2)) {
  if ($(3)) {
    $(x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  a = 10;
}
const c = $( 2 );
if (c) {
  const d = $( 3 );
  if (d) {
    $( a );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
} else {
}
const tmpIfTest$1 = $(2);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(3);
  if (tmpIfTest$3) {
    $(x);
  } else {
  }
} else {
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
 - 4: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
