# Preval test case

# auto_ident_call_computed_simple_simple.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident call computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) || (a = b["$"](1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
} else {
  const b /*:object*/ = { $: $ };
  const tmpNestedComplexRhs /*:unknown*/ = b.$(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
} else {
  const tmpNestedComplexRhs = { $: $ }.$(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  $( b );
}
else {
  const c = { $: $ };
  const d = c.$( 1 );
  $( d );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
