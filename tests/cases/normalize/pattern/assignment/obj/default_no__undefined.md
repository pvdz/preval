# Preval test case

# default_no__undefined.md

> Normalize > Pattern > Assignment > Obj > Default no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({} = undefined);
$('bad');
`````

## Settled


`````js filename=intro
undefined.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````

## Pre Normal


`````js filename=intro
({} = undefined);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = undefined;
let objPatternCrashTest = tmpAssignObjPatternRhs === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = tmpAssignObjPatternRhs === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = tmpAssignObjPatternRhs.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
undefined.cannotDestructureThis;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
