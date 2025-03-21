# Preval test case

# default_no_no_no__arr_0.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default no no no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x }]) {
  return x;
}
$(f([0, 20, 30], 200));
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = (0).x;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$((0).x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
$( a );
`````


## Todos triggered


- (todo) inline computed array property read
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
