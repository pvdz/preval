# Preval test case

# auto_seq_simple_computed_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto seq simple computed complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) || (a = { b: $(1) }));
($(1), a)[$("b")] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
let a /*:unknown*/ = { b: tmpObjLitVal };
if (a) {
  $(a);
  $(1);
} else {
  const tmpObjLitVal$1 /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(1);
}
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpAssignComputedRhs /*:unknown*/ = $(2);
a[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
let a = { b: tmpObjLitVal };
if (a) {
  $(a);
  $(1);
} else {
  const tmpObjLitVal$1 = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(1);
}
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
a[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = { b: a };
if (b) {
  $( b );
  $( 1 );
}
else {
  const c = $( 1 );
  const d = { b: c };
  b = d;
  $( d );
  $( 1 );
}
const e = $( "b" );
const f = $( 2 );
b[e] = f;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 1
 - 4: 'b'
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
