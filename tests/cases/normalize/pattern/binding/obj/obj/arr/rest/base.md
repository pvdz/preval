# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Obj > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const {
  x: {
    y: [...z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 };
$(z);
`````


## Settled


`````js filename=intro
const z /*:array*/ = [1, 2, 3];
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````


## Todos triggered


- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
