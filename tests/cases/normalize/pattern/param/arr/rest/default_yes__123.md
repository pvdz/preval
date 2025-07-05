# Preval test case

# default_yes__123.md

> Normalize > Pattern > Param > Arr > Rest > Default yes  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([...x] = $(['pass'])) {
  return x;
}
$(f(1, 2, 3, 200));
`````


## Settled


`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat = [...1];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat = [...1];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: Array spread on non-string primitive must crash (caused by `const tmpArrPatternSplat = [...1];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = [`pass`];
    tmpBindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  const tmpMCF = tmpArrPatternSplat.slice;
  let x = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
  return x;
};
let tmpCalleeParam$1 = f(1, 2, 3, 200);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) support IfStatement as statement in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
