# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(0)) || $($(2)))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  $(undefined);
  $(tmpNestedComplexRhs);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const a /*:unknown*/ = $(tmpCalleeParam$1);
  $(undefined);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $($(0));
if (tmpNestedComplexRhs) {
  $(undefined);
  $(tmpNestedComplexRhs);
} else {
  const a = $($(2));
  $(undefined);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( undefined );
  $( b );
}
else {
  const c = $( 2 );
  const d = $( c );
  $( undefined );
  $( d );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
