# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident cond s-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = (10, 20, 30) ? $(2) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a);
} else {
  const tmpSSA_tmpNestedComplexRhs /*:unknown*/ = $(2);
  $(tmpSSA_tmpNestedComplexRhs);
  $(tmpSSA_tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $($(100));
  $({ a: 999, b: 1000 });
} else {
  const tmpSSA_tmpNestedComplexRhs = $(2);
  $(tmpSSA_tmpNestedComplexRhs);
  $(tmpSSA_tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  const b = $( 100 );
  $( b );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c );
}
else {
  const d = $( 2 );
  $( d );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    tmpNestedComplexRhs = $(2);
  } else {
    let tmpCalleeParam$1 = $(100);
    tmpNestedComplexRhs = $(tmpCalleeParam$1);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 2
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
