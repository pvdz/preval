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

## Pre Normal


`````js filename=intro
({} = 1);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
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
$( "bad" );
`````

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
