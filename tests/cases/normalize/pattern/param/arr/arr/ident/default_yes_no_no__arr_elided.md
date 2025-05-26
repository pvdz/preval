# Preval test case

# default_yes_no_no__arr_elided.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes no no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('fail')]]) {
  return 'bad';
}
$(f([, , , , 4, 5], 200));
`````


## Settled


`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat\$1 = [...undefined];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat\$1 = [...undefined];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: Array spread on non-string primitive must crash (caused by `const tmpArrPatternSplat$1 = [...undefined];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpArrPatternStep = tmpArrPatternSplat[0];
  let tmpArrPatternSplat$1 = [...tmpArrPatternStep];
  let tmpAPBD = tmpArrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    x = $(`fail`);
    return `bad`;
  } else {
    x = tmpAPBD;
    return `bad`;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = [, , , , 4, 5];
let tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
