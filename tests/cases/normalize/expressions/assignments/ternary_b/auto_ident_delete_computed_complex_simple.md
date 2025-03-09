# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(1) ? (a = delete $(arg)["y"]) : $(200));
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  const tmpDeleteObj /*:unknown*/ = $(arg);
  const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteObj.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, arg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const arg = { y: 1 };
if (tmpIfTest) {
  const tmpDeleteObj = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  $($(200));
  $({ a: 999, b: 1000 }, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$($(1) ? (a = delete $(arg)[`y`]) : $(200));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpDeleteObj = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, arg);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a, arg);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { y: 1 };
if (a) {
  const c = $( b );
  const d = delete c.y;
  $( d );
  $( d, b );
}
else {
  const e = $( 200 );
  $( e );
  const f = {
    a: 999,
    b: 1000,
  };
  $( f, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: true
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
