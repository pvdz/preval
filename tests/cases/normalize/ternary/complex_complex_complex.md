# Preval test case

# complex_complex_complex.md

> Normalize > Ternary > Complex complex complex
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

## Input

`````js filename=intro
const a = $(1) ? $(2) : $(3)
const b = $(0) ? $(4) : $(5)
$(a, b)
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  a = $(2);
} else {
  a = $(3);
}
const tmpIfTest$1 /*:unknown*/ = $(0);
if (tmpIfTest$1) {
  const tmpClusterSSA_b /*:unknown*/ = $(4);
  $(a, tmpClusterSSA_b);
} else {
  const tmpClusterSSA_b$1 /*:unknown*/ = $(5);
  $(a, tmpClusterSSA_b$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if ($(1)) {
  a = $(2);
} else {
  a = $(3);
}
if ($(0)) {
  $(a, $(4));
} else {
  $(a, $(5));
}
`````

## Pre Normal


`````js filename=intro
const a = $(1) ? $(2) : $(3);
const b = $(0) ? $(4) : $(5);
$(a, b);
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = $(2);
} else {
  a = $(3);
}
let b = undefined;
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  b = $(4);
} else {
  b = $(5);
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  a = $( 2 );
}
else {
  a = $( 3 );
}
const c = $( 0 );
if (c) {
  const d = $( 4 );
  $( a, d );
}
else {
  const e = $( 5 );
  $( a, e );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 0
 - 4: 5
 - 5: 2, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
