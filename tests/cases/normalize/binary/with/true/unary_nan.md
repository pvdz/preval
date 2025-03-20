# Preval test case

# unary_nan.md

> Normalize > Binary > With > True > Unary nan
>
> Deal with certain primitive with unary ops

## Input

`````js filename=intro
const arr = [
  ~ true,
  ! true,
  - true,
  + true,
  typeof true,
  void true,
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [-2, false, -1, 1, `boolean`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-2, false, -1, 1, `boolean`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -2, false, -1, 1, "boolean", undefined ];
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-2, false, -1, 1, 'boolean', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
