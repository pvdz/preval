# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), $(arg)).y) && (a = delete ($(1), $(2), $(arg)).y));
$(a, arg);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  $(1);
  $(2);
  const tmpDeleteObj$1 /*:unknown*/ = $(arg);
  const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteObj$1.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  $(false);
  $(false, arg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
if (delete tmpDeleteObj.y) {
  $(1);
  $(2);
  const tmpDeleteObj$1 = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj$1.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  $(false);
  $(false, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), $(arg)).y) && (a = delete ($(1), $(2), $(arg)).y));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpDeleteObj$1 = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj$1.y;
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
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
if (c) {
  $( 1 );
  $( 2 );
  const d = $( a );
  const e = delete d.y;
  $( e );
  $( e, a );
}
else {
  $( false );
  $( false, a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 1
 - 5: 2
 - 6: {}
 - 7: true
 - 8: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
