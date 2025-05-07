# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = []) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpNestedComplexRhs /*:array*/ = [];
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
  const tmpNestedComplexRhs = [];
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
  const b = [];
  $( b );
  $( b );
}
else {
  const c = $( 200 );
  $( c );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d );
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: []
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
