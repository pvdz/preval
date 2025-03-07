# Preval test case

# not_used_as_prop.md

> Object literal > Static prop lookups > Not used as prop
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {x: $(1)};
$(o);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ = { x: tmpObjLitVal };
$(o);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$({ x: tmpObjLitVal });
`````

## Pre Normal


`````js filename=intro
const o = { x: $(1) };
$(o);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
$(o);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: a };
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
