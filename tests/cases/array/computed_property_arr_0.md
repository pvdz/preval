# Preval test case

# computed_property_arr_0.md

> Array > Computed property arr 0
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = ['pass'];
$(x[[0]]);
`````

## Settled


`````js filename=intro
$(`pass`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````

## Pre Normal


`````js filename=intro
const x = [`pass`];
$(x[[0]]);
`````

## Normalized


`````js filename=intro
const x = [`pass`];
const tmpCompObj = x;
const tmpCompProp = [0];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
