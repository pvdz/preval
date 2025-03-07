# Preval test case

# computed_property_obj_1.md

> Array > Computed property obj 1
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = {1: 'pass'};
$(x[[1]]);
`````

## Settled


`````js filename=intro
const x /*:object*/ = { [1]: `pass` };
const tmpCalleeParam /*:unknown*/ = x[`1`];
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [1]: `pass` }[`1`]);
`````

## Pre Normal


`````js filename=intro
const x = { [1]: `pass` };
$(x[[1]]);
`````

## Normalized


`````js filename=intro
const x = { [1]: `pass` };
const tmpCompObj = x;
const tmpCompProp = [1];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { [ 1 ]: "pass" };
const b = a[ "1" ];
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
