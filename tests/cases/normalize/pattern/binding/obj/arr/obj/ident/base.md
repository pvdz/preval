# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Arr > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [{ y }] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 };
$(y);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
