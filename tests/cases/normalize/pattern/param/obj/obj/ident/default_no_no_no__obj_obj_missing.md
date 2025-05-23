# Preval test case

# default_no_no_no__obj_obj_missing.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default no no no  obj obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y } }) {
  return y;
}
$(f({ x: { x: 1, z: 3 }, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $Object_prototype.y;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.y;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let y = tmpOPND.y;
  return y;
};
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, z: 3 };
let tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
let tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
