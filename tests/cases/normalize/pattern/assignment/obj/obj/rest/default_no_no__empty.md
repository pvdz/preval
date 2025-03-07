# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { ...y } } = 1);
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const tmpCalleeParam$1 /*:array*/ = [];
y = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
y = objPatternRest((1).x, [], undefined);
$(`bad`);
`````

## Pre Normal


`````js filename=intro
({
  x: { ...y },
} = 1);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
y = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const b = [];
y = objPatternRest( a, b, undefined );
$( "bad" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
