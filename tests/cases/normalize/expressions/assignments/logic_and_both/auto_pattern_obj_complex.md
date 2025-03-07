# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(({ a } = $({ a: 1, b: 2 })) && ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  const tmpCalleeParam$3 /*:object*/ = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
  tmpClusterSSA_a = tmpNestedAssignObjPatternRhs$1.a;
  $(tmpNestedAssignObjPatternRhs$1);
} else {
  $(tmpNestedAssignObjPatternRhs);
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
let tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  const tmpNestedAssignObjPatternRhs$1 = $({ a: 1, b: 2 });
  tmpClusterSSA_a = tmpNestedAssignObjPatternRhs$1.a;
  $(tmpNestedAssignObjPatternRhs$1);
} else {
  $(tmpNestedAssignObjPatternRhs);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(({ a: a } = $({ a: 1, b: 2 })) && ({ a: a } = $({ a: 1, b: 2 })));
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
  const tmpCalleeParam$3 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$3);
  a = tmpNestedAssignObjPatternRhs$1.a;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs$1;
} else {
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
let c = b.a;
if (b) {
  const d = {
    a: 1,
    b: 2,
  };
  const e = $( d );
  c = e.a;
  $( e );
}
else {
  $( b );
}
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: { a: '1', b: '2' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
