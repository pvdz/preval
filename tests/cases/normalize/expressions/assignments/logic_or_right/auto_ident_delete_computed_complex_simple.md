# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(100) || (a = delete $(arg)["y"]));
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const arg /*:object*/ = { y: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, arg);
} else {
  const tmpDeleteObj /*:unknown*/ = $(arg);
  const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteObj.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const arg = { y: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, arg);
} else {
  const tmpDeleteObj = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$($(100) || (a = delete $(arg)[`y`]));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, arg);
} else {
  const tmpDeleteObj = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, arg);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { y: 1 };
if (a) {
  $( a );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c, b );
}
else {
  const d = $( b );
  const e = delete d.y;
  $( e );
  $( e, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { y: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
