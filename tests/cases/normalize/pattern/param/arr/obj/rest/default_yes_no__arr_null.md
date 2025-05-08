# Preval test case

# default_yes_no__arr_null.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return 'bad';
}
$(f([null, 20, 30], 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ = [];
$objPatternRest(null, tmpCalleeParam$3, undefined);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest(null, [], undefined);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$objPatternRest( null, a, undefined );
$( "bad" );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
