# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(1)) && $($(1)) && $($(2)))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpNestedComplexRhs) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpNestedComplexRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
  } else {
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
} else {
  $(undefined);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $($(1));
if (tmpNestedComplexRhs) {
  const tmpClusterSSA_tmpNestedComplexRhs = $($(1));
  if (tmpClusterSSA_tmpNestedComplexRhs) {
    const tmpClusterSSA_tmpNestedComplexRhs$1 = $($(2));
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
  } else {
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
} else {
  $(undefined);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( undefined );
    $( f );
  }
  else {
    $( undefined );
    $( d );
  }
}
else {
  $( undefined );
  $( b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
