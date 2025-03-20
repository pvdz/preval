# Preval test case

# auto_computed_complex_complex_simple.md

> Normalize > Expressions > Assignments > Logic and right > Auto computed complex complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = { b: $(1) }));
$(a)[$("b")] = 2;
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
const tmpAssignComMemLhsObj /*:unknown*/ = $(a);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 100 );
if (b) {
  const c = $( 1 );
  const d = { b: c };
  a = d;
  $( d );
}
else {
  $( b );
}
const e = $( a );
const f = $( "b" );
e[f] = 2;
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: { b: '1' }
 - 4: { b: '1' }
 - 5: 'b'
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
