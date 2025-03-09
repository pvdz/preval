# Preval test case

# auto_computed_simple_simple_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto computed simple simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) ? $(100) : $(200));
a["b"] = $(2);
$(a);
`````

## Settled


`````js filename=intro
$(1);
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
const tmpAssignMemRhs /*:unknown*/ = $(2);
const a /*:object*/ = { b: tmpAssignMemRhs };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(100));
const tmpAssignMemRhs = $(2);
$({ b: tmpAssignMemRhs });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) ? $(100) : $(200));
a[`b`] = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
}
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 100 );
$( a );
const b = $( 2 );
const c = { b: b };
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
