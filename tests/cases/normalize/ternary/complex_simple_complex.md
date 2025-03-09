# Preval test case

# complex_simple_complex.md

> Normalize > Ternary > Complex simple complex
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

## Input

`````js filename=intro
const a = $(1) ? 2 : $(3)
const b = $(0) ? 4 : $(5)
$(a, b)
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = 2;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
} else {
  a = $(3);
}
const tmpIfTest$1 /*:unknown*/ = $(0);
if (tmpIfTest$1) {
  $(a, 4);
} else {
  const tmpClusterSSA_b /*:unknown*/ = $(5);
  $(a, tmpClusterSSA_b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 2;
if (!$(1)) {
  a = $(3);
}
if ($(0)) {
  $(a, 4);
} else {
  $(a, $(5));
}
`````

## Pre Normal


`````js filename=intro
const a = $(1) ? 2 : $(3);
const b = $(0) ? 4 : $(5);
$(a, b);
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  a = $(3);
}
let b = undefined;
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  b = 4;
  $(a, b);
} else {
  b = $(5);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
if (b) {

}
else {
  a = $( 3 );
}
const c = $( 0 );
if (c) {
  $( a, 4 );
}
else {
  const d = $( 5 );
  $( a, d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 5
 - 4: 2, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
