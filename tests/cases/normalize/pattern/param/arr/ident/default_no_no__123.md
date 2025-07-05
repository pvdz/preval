# Preval test case

# default_no_no__123.md

> Normalize > Pattern > Param > Arr > Ident > Default no no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([x]) {
  return 'bad';
}
$(f(1, 2, 3, 200));
`````


## Settled


`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`[...1];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`[...1];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: Array spread on non-string primitive must crash (caused by `[...1];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let x = tmpArrPatternSplat[0];
  return `bad`;
};
let tmpCalleeParam = f(1, 2, 3, 200);
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
