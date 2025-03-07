# Preval test case

# double_nested.md

> Normalize > Member access > Assign rhs > Double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
let x = 10;
x = obj.a.b.c;
$(x);
`````

## Settled


`````js filename=intro
const tmpObjLitVal$3 /*:unknown*/ = $();
$(tmpObjLitVal$3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($());
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: { c: $() } } };
let x = 10;
x = obj.a.b.c;
$(x);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$3 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let x = 10;
const tmpCompObj = obj.a;
const tmpAssignRhsProp = tmpCompObj.b;
x = tmpAssignRhsProp.c;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
