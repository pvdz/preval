# Preval test case

# auto_computed_simple_simple_complex.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto computed simple simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: $(1) }).a;
a["b"] = $(2);
$(a);
`````

## Settled


`````js filename=intro
$(1);
$Object_prototype.a;
const tmpAssignMemRhs /*:unknown*/ = $(2);
const a /*:object*/ = { b: tmpAssignMemRhs };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$Object_prototype.a;
const tmpAssignMemRhs = $(2);
$({ b: tmpAssignMemRhs });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: $(1) }).a;
a[`b`] = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCompObj = a;
tmpCompObj.a;
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$Object_prototype.a;
const a = $( 2 );
const b = { b: a };
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
