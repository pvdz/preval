# Preval test case

# default_no_no_no__obj_str.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default no no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y] }) {
  return y;
}
$(f({ x: 'abc', a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
$(`a`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpArrPatternSplat = [...tmpOPND];
  let y = tmpArrPatternSplat[0];
  return y;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = { x: `abc`, a: 11, b: 12 };
let tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
