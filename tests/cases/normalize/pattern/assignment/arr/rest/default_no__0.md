# Preval test case

# default_no__0.md

> Normalize > Pattern > Assignment > Arr > Rest > Default no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([...x] = 0);
$('bad');
`````


## Settled


`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat = [...0];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat = [...0];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: Array spread on non-string primitive must crash (caused by `const tmpArrPatternSplat = [...0];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = 0;
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpMCF = tmpArrPatternSplat.slice;
x = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
$(`bad`);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
