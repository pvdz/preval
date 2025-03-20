# Preval test case

# complex_complex_simple.md

> Normalize > Ternary > Complex complex simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

## Input

`````js filename=intro
const a = $(1) ? $(2) : 3
const b = $(0) ? $(4) : 5
$(a, b)
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 3;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  a = $(2);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(0);
if (tmpIfTest$1) {
  const tmpClusterSSA_b /*:unknown*/ = $(4);
  $(a, tmpClusterSSA_b);
} else {
  $(a, 5);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 3;
if ($(1)) {
  a = $(2);
}
if ($(0)) {
  $(a, $(4));
} else {
  $(a, 5);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 3;
const b = $( 1 );
if (b) {
  a = $( 2 );
}
const c = $( 0 );
if (c) {
  const d = $( 4 );
  $( a, d );
}
else {
  $( a, 5 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 0
 - 4: 2, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
