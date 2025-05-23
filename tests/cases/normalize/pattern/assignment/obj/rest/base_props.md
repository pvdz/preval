# Preval test case

# base_props.md

> Normalize > Pattern > Assignment > Obj > Rest > Base props
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ a, b, ...x } = { x: 1, a: 2, b: 3, c: 4 });
$(x);
`````


## Settled


`````js filename=intro
a = 2;
b = 3;
const tmpAssignObjPatternRhs /*:object*/ = { x: 1, a: 2, b: 3, c: 4 };
const tmpCalleeParam$1 /*:array*/ = [`a`, `b`];
x = $objPatternRest(tmpAssignObjPatternRhs, tmpCalleeParam$1, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a = 2;
b = 3;
x = $objPatternRest({ x: 1, a: 2, b: 3, c: 4 }, [`a`, `b`], `x`);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
a = 2;
b = 3;
const c = {
  x: 1,
  a: 2,
  b: 3,
  c: 4,
};
const d = [ "a", "b" ];
x = $objPatternRest( c, d, "x" );
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, a: 2, b: 3, c: 4 };
a = tmpAssignObjPatternRhs.a;
b = tmpAssignObjPatternRhs.b;
let tmpCalleeParam = tmpAssignObjPatternRhs;
let tmpCalleeParam$1 = [`a`, `b`];
x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
$(x);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 3 implicit global bindings:

a, b, x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
