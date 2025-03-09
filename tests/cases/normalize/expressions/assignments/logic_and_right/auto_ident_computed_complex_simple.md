# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)["c"]));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { c: 1 };
if (tmpCalleeParam) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj.c;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const b = { c: 1 };
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = $(b).c;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)[`c`]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpCompObj = $(b);
  const tmpNestedComplexRhs = tmpCompObj.c;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
} else {
  $(tmpCalleeParam);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { c: 1 };
if (a) {
  const c = $( b );
  const d = c.c;
  $( d );
  $( d, b );
}
else {
  $( a );
  const e = {
    a: 999,
    b: 1000,
  };
  $( e, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 1
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
