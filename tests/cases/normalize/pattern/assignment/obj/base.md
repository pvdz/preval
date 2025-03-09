# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({} = { a: 1, b: 2, c: 3 });
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

## Pre Normal


`````js filename=intro
({} = { a: 1, b: 2, c: 3 });
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { a: 1, b: 2, c: 3 };
let objPatternCrashTest = tmpAssignObjPatternRhs === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = tmpAssignObjPatternRhs === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = tmpAssignObjPatternRhs.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( "ok" );
`````

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
