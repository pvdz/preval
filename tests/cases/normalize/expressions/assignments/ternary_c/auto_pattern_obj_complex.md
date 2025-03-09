# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$($(0) ? $(100) : ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(999);
} else {
  const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
  $(tmpNestedAssignObjPatternRhs);
  $(tmpClusterSSA_a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $($(100));
  $(999);
} else {
  const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
  const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
  $(tmpNestedAssignObjPatternRhs);
  $(tmpClusterSSA_a);
}
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$($(0) ? $(100) : ({ a: a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs;
  $(tmpNestedAssignObjPatternRhs);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  const b = $( 100 );
  $( b );
  $( 999 );
}
else {
  const c = {
    a: 1,
    b: 2,
  };
  const d = $( c );
  const e = d.a;
  $( d );
  $( e );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: { a: '1', b: '2' }
 - 3: { a: '1', b: '2' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
