# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = [$(1), 2, $(3)]));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
} else {
  const tmpArrElement /*:unknown*/ = $(1);
  const tmpArrElement$3 /*:unknown*/ = $(3);
  const tmpNestedComplexRhs /*:array*/ = [tmpArrElement, 2, tmpArrElement$3];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $($(100));
  $({ a: 999, b: 1000 });
} else {
  const tmpArrElement = $(1);
  const tmpArrElement$3 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement, 2, tmpArrElement$3];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
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
  const d = $( 1 );
  const e = $( 3 );
  const f = [ d, 2, e ];
  $( f );
  $( f );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 3
 - 4: [1, 2, 3]
 - 5: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
