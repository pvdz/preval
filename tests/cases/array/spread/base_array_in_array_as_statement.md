# Preval test case

# base_array_in_array_as_statement.md

> Array > Spread > Base array in array as statement
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
const x = [1, 2, 3];
['a', ...x, 'b'];
$('the end');
`````


## Settled


`````js filename=intro
$(`the end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`the end`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "the end" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'the end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
