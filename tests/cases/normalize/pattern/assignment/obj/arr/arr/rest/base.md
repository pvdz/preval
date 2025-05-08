# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [[...y]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = [1, 2, 3];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = [1, 2, 3];
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
y = [ 1, 2, 3 ];
$( y );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
