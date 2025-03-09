# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = $($(0)) || $($(2)))) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $(100);
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  $(100);
  $(tmpClusterSSA_a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
if (a) {
  $(100);
  $(a);
} else {
  const tmpClusterSSA_a = $($(2));
  $(100);
  $(tmpClusterSSA_a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = $($(0)) || $($(2)));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
a = $(tmpCalleeParam);
if (a) {
} else {
  const tmpCalleeParam$1 = $(2);
  a = $(tmpCalleeParam$1);
}
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( 100 );
  $( b );
}
else {
  const c = $( 2 );
  const d = $( c );
  $( 100 );
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
