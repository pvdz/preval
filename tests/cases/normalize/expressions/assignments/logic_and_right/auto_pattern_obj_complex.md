# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$($(100) && ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = 999;
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  $(tmpNestedAssignObjPatternRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 999;
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
  a = tmpNestedAssignObjPatternRhs.a;
  $(tmpNestedAssignObjPatternRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$($(100) && ({ a: a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs;
} else {
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 999;
const b = $( 100 );
if (b) {
  const c = {
    a: 1,
    b: 2,
  };
  const d = $( c );
  a = d.a;
  $( d );
}
else {
  $( b );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { a: '1', b: '2' }
 - 3: { a: '1', b: '2' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
