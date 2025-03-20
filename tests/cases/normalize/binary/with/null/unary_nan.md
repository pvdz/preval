# Preval test case

# unary_nan.md

> Normalize > Binary > With > Null > Unary nan
>
> Deal with certain primitive with unary ops

## Input

`````js filename=intro
const arr = [
  ~ null,
  ! null,
  - null,
  + null,
  typeof null,
  void null,
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [-1, true, -0, 0, `object`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-1, true, -0, 0, `object`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -1, true, -0, 0, "object", undefined ];
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-1, true, 0, 0, 'object', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
