# Preval test case

# computed_property_arr_empty.md

> Array > Computed property arr empty
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = [];
$(x[[]]);
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
const x = [];
$(x[[]]);
`````

## Normalized


`````js filename=intro
const x = [];
const tmpCompObj = x;
const tmpCompProp = [];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
