# Preval test case

# unary_arr_numbers.md

> Normalize > Binary > With > Arr > Unary arr numbers
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  ~ [10, 20, 30],
  ! [10, 20, 30],
  - [10, 20, 30],
  + [10, 20, 30],
  typeof [10, 20, 30],
  void [10, 20, 30],
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [-1, false, NaN, NaN, `object`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-1, false, NaN, NaN, `object`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -1, false, NaN, NaN, "object", undefined ];
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-1, false, NaN, NaN, 'object', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
