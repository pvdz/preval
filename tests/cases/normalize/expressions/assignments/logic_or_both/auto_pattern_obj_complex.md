# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(({ a } = $({ a: 1, b: 2 })) || ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  $(tmpNestedAssignObjPatternRhs);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$3 /*:object*/ = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpClusterSSA_a$1 /*:unknown*/ = tmpNestedAssignObjPatternRhs$1.a;
  $(tmpNestedAssignObjPatternRhs$1);
  $(tmpClusterSSA_a$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  $(tmpNestedAssignObjPatternRhs);
  $(tmpClusterSSA_a);
} else {
  const tmpNestedAssignObjPatternRhs$1 = $({ a: 1, b: 2 });
  const tmpClusterSSA_a$1 = tmpNestedAssignObjPatternRhs$1.a;
  $(tmpNestedAssignObjPatternRhs$1);
  $(tmpClusterSSA_a$1);
}
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(({ a: a } = $({ a: 1, b: 2 })) || ({ a: a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpCalleeParam = undefined;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpCalleeParam = tmpNestedAssignObjPatternRhs;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCalleeParam$3 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$3);
  a = tmpNestedAssignObjPatternRhs$1.a;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs$1;
  $(tmpNestedAssignObjPatternRhs$1);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
if (b) {
  $( b );
  $( c );
}
else {
  const d = {
    a: 1,
    b: 2,
  };
  const e = $( d );
  const f = e.a;
  $( e );
  $( f );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
