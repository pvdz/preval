# Preval test case

# default_no__empty.md

> Normalize > Pattern > Assignment > Obj > Default no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({} = 1);
$('bad');
`````


## Settled


`````js filename=intro
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "bad" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
let tmpObjPatternCrashTest = tmpAssignObjPatternRhs === undefined;
if (tmpObjPatternCrashTest) {
} else {
  tmpObjPatternCrashTest = tmpAssignObjPatternRhs === null;
}
if (tmpObjPatternCrashTest) {
  tmpObjPatternCrashTest = tmpAssignObjPatternRhs.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
