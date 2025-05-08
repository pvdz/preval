# Preval test case

# default_no_no_no__arr_123.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default no no no  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x }]) {
  return x;
}
$(f([1, 2, 3, 20, 30], 200));
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $Number_prototype.x;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_prototype.x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
$( a );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
