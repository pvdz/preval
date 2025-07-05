# Preval test case

# default_yes_no__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return 'bad';
}
$(f(undefined, 200));
`````


## Settled


`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat = [...undefined];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat = [...undefined];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: Array spread on non-string primitive must crash (caused by `const tmpArrPatternSplat = [...undefined];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = { a: `fail` };
    tmpArrPatternStep = $(tmpCalleeParam);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpCalleeParam$1 = tmpArrPatternStep;
  let tmpCalleeParam$3 = [];
  let x = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
  return `bad`;
};
let tmpCalleeParam$5 = f(undefined, 200);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) support Identifier as var init in let_hoisting noob check
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
