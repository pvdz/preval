# Preval test case

# default_yes_no_no__obj_arr_empty.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes no no  obj arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y = 'pass'] } = { x: [], a: 11, b: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = `pass`;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = `pass`;
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
y = "pass";
$( y );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpArrPatternSplat = [...tmpOPND];
const tmpAPBD = tmpArrPatternSplat[0];
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  y = `pass`;
  $(y);
} else {
  y = tmpAPBD;
  $(tmpAPBD);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
