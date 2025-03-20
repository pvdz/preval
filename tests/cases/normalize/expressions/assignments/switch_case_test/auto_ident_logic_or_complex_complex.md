# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $($(0)) || $($(2))):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const a = $($(0));
if (a) {
  $(a);
} else {
  $($($(2)));
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
}
else {
  const c = $( 2 );
  const d = $( c );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
