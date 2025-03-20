# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = new ($($))(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpNewCallee /*:unknown*/ = $($);
  const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
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
  const tmpNewCallee = $($);
  const tmpNestedComplexRhs = new tmpNewCallee(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
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
  const b = $( $ );
  const c = new b( 1 );
  $( c );
  $( c );
}
else {
  $( a );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: {}
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
