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
let a /*:unknown*/ = 999;
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  $(tmpNestedAssignObjPatternRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 999;
if ($(0)) {
  $($(100));
} else {
  const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
  a = tmpNestedAssignObjPatternRhs.a;
  $(tmpNestedAssignObjPatternRhs);
}
$(a);
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
} else {
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 999;
const b = $( 0 );
if (b) {
  const c = $( 100 );
  $( c );
}
else {
  const d = {
    a: 1,
    b: 2,
  };
  const e = $( d );
  a = e.a;
  $( e );
}
$( a );
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
