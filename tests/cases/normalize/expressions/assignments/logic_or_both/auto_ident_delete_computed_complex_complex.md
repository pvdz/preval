# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete $(arg)[$("y")]) || (a = delete $(arg)[$("y")]));
$(a, arg);
`````

## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
let tmpClusterSSA_a /*:unknown*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
} else {
  const tmpDeleteCompObj$1 /*:unknown*/ = $(arg);
  const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
  const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(tmpClusterSSA_a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
let tmpClusterSSA_a = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
} else {
  const tmpDeleteCompObj$1 = $(arg);
  const tmpDeleteCompProp$1 = $(`y`);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(tmpClusterSSA_a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete $(arg)[$(`y`)]) || (a = delete $(arg)[$(`y`)]));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpDeleteCompObj$1 = $(arg);
  const tmpDeleteCompProp$1 = $(`y`);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
let d = delete b[ c ];
if (d) {
  $( d );
}
else {
  const e = $( a );
  const f = $( "y" );
  const g = delete e[ f ];
  d = g;
  $( g );
}
$( d, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: true
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
