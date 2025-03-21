# Preval test case

# unary_arr_strings.md

> Normalize > Binary > With > Arr > Unary arr strings
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  ~ ['a', 'b', 'c'],
  ! ['a', 'b', 'c'],
  - ['a', 'b', 'c'],
  + ['a', 'b', 'c'],
  typeof ['a', 'b', 'c'],
  void ['a', 'b', 'c'],
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
