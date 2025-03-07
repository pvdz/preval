# Preval test case

# method_call2.md

> Object literal > Static prop lookups > Method call2
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {x: $(1)};
$(o.x());
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ = { x: tmpObjLitVal };
const tmpCalleeParam /*:unknown*/ = o.x();
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$({ x: tmpObjLitVal }.x());
`````

## Pre Normal


`````js filename=intro
const o = { x: $(1) };
$(o.x());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const tmpCalleeParam = o.x();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: a };
const c = b.x();
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
