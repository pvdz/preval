# Preval test case

# default_no__obj_empty.md

> Normalize > Pattern > Assignment > Obj > Default no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({} = {});
$('ok');
`````


## Settled


`````js filename=intro
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ok" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = {};
let tmpObjPatternCrashTest = tmpAssignObjPatternRhs === undefined;
if (tmpObjPatternCrashTest) {
} else {
  tmpObjPatternCrashTest = tmpAssignObjPatternRhs === null;
}
if (tmpObjPatternCrashTest) {
  tmpObjPatternCrashTest = tmpAssignObjPatternRhs.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
