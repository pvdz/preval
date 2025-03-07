# Preval test case

# base_array_in_array_as_var.md

> Array > Spread > Base array in array as var
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
const x = [1, 2, 3];
const y = ['a', ...x, 'b'];
$(y);
`````

## Settled


`````js filename=intro
const y /*:array*/ = [`a`, 1, 2, 3, `b`];
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`, 1, 2, 3, `b`]);
`````

## Pre Normal


`````js filename=intro
const x = [1, 2, 3];
const y = [`a`, ...x, `b`];
$(y);
`````

## Normalized


`````js filename=intro
const x = [1, 2, 3];
const y = [`a`, ...x, `b`];
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", 1, 2, 3, "b" ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['a', 1, 2, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
