# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    ({ a } = $({ a: 1, b: 2 }));
}
$(a);
`````

## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignObjPatternRhs.a;
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($({ a: 1, b: 2 }).a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    ({ a: a } = $({ a: 1, b: 2 }));
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpSwitchDisc = $(1);
const tmpCalleeParam = { a: 1, b: 2 };
const tmpAssignObjPatternRhs = $(tmpCalleeParam);
a = tmpAssignObjPatternRhs.a;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
