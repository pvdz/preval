# Preval test case

# default_yes__undefined.md

> Normalize > Pattern > Param > Arr > Default yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([] = $('pass')) {
  return 'ok';
}
$(f(undefined, 200));
`````


## Settled


`````js filename=intro
const tmpSSA_tmpBindingPatternArrRoot /*:unknown*/ = $(`pass`);
[...tmpSSA_tmpBindingPatternArrRoot];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_tmpBindingPatternArrRoot = $(`pass`);
[...tmpSSA_tmpBindingPatternArrRoot];
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
[ ...a ];
$( "ok" );
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
    tmpBindingPatternArrRoot = $(`pass`);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  return `ok`;
};
let tmpCalleeParam = f(undefined, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
