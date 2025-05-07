# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = !$(100)) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpUnaryArg /*:unknown*/ = $(100);
  const tmpNestedComplexRhs /*:boolean*/ = !tmpUnaryArg;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  const tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpUnaryArg = $(100);
  const tmpNestedComplexRhs = !tmpUnaryArg;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 100 );
  const c = !b;
  $( c );
  $( c );
}
else {
  const d = $( 200 );
  $( d );
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
 - 1: 1
 - 2: 100
 - 3: false
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
