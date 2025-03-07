# Preval test case

# nested_assign.md

> Normalize > Member access > Statement > Global > Nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b = 15;
$(obj.a.b);
`````

## Settled


`````js filename=intro
$();
$(15);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$(15);
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: $() } };
obj.a.b = 15;
$(obj.a.b);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpAssignMemLhsObj = obj.a;
tmpAssignMemLhsObj.b = 15;
const tmpCompObj = obj.a;
const tmpCalleeParam = tmpCompObj.b;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$();
$( 15 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
