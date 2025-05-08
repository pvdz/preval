# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Obj > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({
  x: {
    y: [z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 });
$(z);
`````


## Settled


`````js filename=intro
z = 1;
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
z = 1;
$(z);
`````


## PST Settled
With rename=true

`````js filename=intro
z = 1;
$( z );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

z


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
