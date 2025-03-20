# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = void $(100)));
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
  $(100);
  $(undefined);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $($(100));
  $({ a: 999, b: 1000 });
} else {
  $(100);
  $(undefined);
  $(undefined);
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
  $( 100 );
  $( undefined );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 100
 - 3: undefined
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
