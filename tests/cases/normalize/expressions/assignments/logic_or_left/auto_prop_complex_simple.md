# Preval test case

# auto_prop_complex_simple.md

> Normalize > Expressions > Assignments > Logic or left > Auto prop complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) || $(100));
$(a).b = 2;
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
$(a);
const tmpAssignMemLhsObj /*:unknown*/ = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$(a);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) || $(100));
$(a).b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
}
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
$( b );
const c = $( b );
c.b = 2;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
