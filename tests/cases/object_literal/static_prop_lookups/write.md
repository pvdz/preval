# Preval test case

# write.md

> Object literal > Static prop lookups > Write
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {x: $(1)};
$(o.x = 2);
`````

## Settled


`````js filename=intro
$(1);
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
`````

## Pre Normal


`````js filename=intro
const o = { x: $(1) };
$((o.x = 2));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const varInitAssignLhsComputedRhs = 2;
o.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
