# Preval test case

# double_nested.md

> Normalize > Member access > Call arg > Double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj.a.b.c);
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
$(obj.a.b.c);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$3 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj$1 = obj.a;
const tmpCompObj = tmpCompObj$1.b;
const tmpCalleeParam = tmpCompObj.c;
$(tmpCalleeParam);
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
