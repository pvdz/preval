# Preval test case

# computed_property_obj_empty.md

> Array > Computed property obj empty
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = {'': 'pass'};
$(x[[]]);
`````

## Settled


`````js filename=intro
const x /*:object*/ = { [``]: `pass` };
const tmpCalleeParam /*:unknown*/ = x[``];
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [``]: `pass` }[``]);
`````

## Pre Normal


`````js filename=intro
const x = { [``]: `pass` };
$(x[[]]);
`````

## Normalized


`````js filename=intro
const x = { [``]: `pass` };
const tmpCompObj = x;
const tmpCompProp = [];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { [ "" ]: "pass" };
const b = a[ "" ];
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
