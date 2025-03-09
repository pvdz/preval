# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident delete prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(100) && (a = delete $(arg).y));
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const arg /*:object*/ = { y: 1 };
if (tmpCalleeParam) {
  const tmpDeleteObj /*:unknown*/ = $(arg);
  const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteObj.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, arg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const arg = { y: 1 };
if (tmpCalleeParam) {
  const tmpDeleteObj = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$($(100) && (a = delete $(arg).y));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpDeleteObj = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, arg);
} else {
  $(tmpCalleeParam);
  $(a, arg);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { y: 1 };
if (a) {
  const c = $( b );
  const d = delete c.y;
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
 - 2: { y: '1' }
 - 3: true
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
