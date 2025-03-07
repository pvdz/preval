# Preval test case

# nested_assign.md

> Normalize > Member access > Statement > Func > Nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  $(obj.a.b);
}
$(f());
`````

## Settled


`````js filename=intro
$();
$(15);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$(15);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: $() } };
  obj.a.b = 15;
  $(obj.a.b);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  const tmpCompObj = obj.a;
  const tmpCalleeParam = tmpCompObj.b;
  $(tmpCalleeParam);
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
$();
$( 15 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: 15
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
