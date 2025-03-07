# Preval test case

# nested_computed.md

> Normalize > Member access > Statement > Global > Nested computed
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a['b'];
`````

## Settled


`````js filename=intro
$();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: $() } };
obj.a[`b`];
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj = obj.a;
tmpCompObj.b;
`````

## PST Settled
With rename=true

`````js filename=intro
$();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
