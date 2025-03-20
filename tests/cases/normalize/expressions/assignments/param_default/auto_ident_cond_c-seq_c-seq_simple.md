# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(60);
  $(undefined);
  $(tmpClusterSSA_tmpNestedComplexRhs);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpNestedComplexRhs$1 /*:unknown*/ = $(tmpCalleeParam);
  $(undefined);
  $(tmpClusterSSA_tmpNestedComplexRhs$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(30)) {
  const tmpClusterSSA_tmpNestedComplexRhs = $(60);
  $(undefined);
  $(tmpClusterSSA_tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpNestedComplexRhs$1 = $($(100));
  $(undefined);
  $(tmpClusterSSA_tmpNestedComplexRhs$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  const b = $( 60 );
  $( undefined );
  $( b );
}
else {
  const c = $( 100 );
  const d = $( c );
  $( undefined );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: undefined
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
