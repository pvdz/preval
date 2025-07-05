# Preval test case

# default_yes__null.md

> Normalize > Pattern > Param > Arr > Default yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([] = $('fail')) {
  return 'bad';
}
$(f(null, 200));
`````


## Settled


`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`[...null];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`[...null];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: Array spread on non-string primitive must crash (caused by `[...null];`)";
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
    tmpBindingPatternArrRoot = $(`fail`);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  return `bad`;
};
let tmpCalleeParam = f(null, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
