# Preval test case

# computed.md

> Normalize > Object > Computed
>
> Computed keys

## Input

`````js filename=intro
const obj = {
  [$(1)]: $(2),
};
$(obj);
`````

## Settled


`````js filename=intro
const tmpObjLitPropKey /*:unknown*/ = $(1);
const tmpObjLitPropVal /*:unknown*/ = $(2);
const obj /*:object*/ = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(obj);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitPropKey = $(1);
const tmpObjLitPropVal = $(2);
$({ [tmpObjLitPropKey]: tmpObjLitPropVal });
`````

## Pre Normal


`````js filename=intro
const obj = { [$(1)]: $(2) };
$(obj);
`````

## Normalized


`````js filename=intro
const tmpObjLitPropKey = $(1);
const tmpObjLitPropVal = $(2);
const obj = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(obj);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = { [ a ]: b };
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { 1: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
