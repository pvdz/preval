# Preval test case

# computed_property_obj_0.md

> Array > Computed property obj 0
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = {0: 'pass'};
$(x[[0]]);
`````

## Settled


`````js filename=intro
const x /*:object*/ = { [0]: `pass` };
const tmpCalleeParam /*:unknown*/ = x[`0`];
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [0]: `pass` }[`0`]);
`````

## Pre Normal


`````js filename=intro
const x = { [0]: `pass` };
$(x[[0]]);
`````

## Normalized


`````js filename=intro
const x = { [0]: `pass` };
const tmpCompObj = x;
const tmpCompProp = [0];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { [ 0 ]: "pass" };
const b = a[ "0" ];
$( b );
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
