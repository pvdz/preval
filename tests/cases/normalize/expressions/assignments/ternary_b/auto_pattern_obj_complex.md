# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$($(1) ? ({ a } = $({ a: 1, b: 2 })) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
  $(tmpNestedAssignObjPatternRhs);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpCalleeParam);
  $(999);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
  const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
  $(tmpNestedAssignObjPatternRhs);
  $(tmpClusterSSA_a);
} else {
  $($(200));
  $(999);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = {
    a: 1,
    b: 2,
  };
  const c = $( b );
  const d = c.a;
  $( c );
  $( d );
}
else {
  const e = $( 200 );
  $( e );
  $( 999 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: { a: '1', b: '2' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
