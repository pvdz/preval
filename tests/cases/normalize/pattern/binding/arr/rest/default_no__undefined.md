# Preval test case

# default_no__undefined.md

> Normalize > Pattern > Binding > Arr > Rest > Default no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [...x] = undefined;
$('bad');
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
const tmpBindingPatternArrRoot = undefined;
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpMCF = tmpArrPatternSplat.slice;
const x = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
$(`bad`);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
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
