# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpIfTest /*:unknown*/ = $(30);
  if (tmpIfTest) {
    $(60);
    $(60);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(100);
    const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  if ($(30)) {
    $(60);
    $(60);
  } else {
    const tmpNestedComplexRhs = $($(100));
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $( 30 );
  if (b) {
    $( 60 );
    $( 60 );
  }
  else {
    const c = $( 100 );
    const d = $( c );
    $( d );
    $( d );
  }
}
else {
  $( a );
  const e = {
    a: 999,
    b: 1000,
  };
  $( e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 30
 - 3: 60
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
