# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Assignment > Obj > Arr > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [] } = '');
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = ``.x;
[...objPatternNoDefault];
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = ``.x;
[...objPatternNoDefault];
$(`bad`);
`````

## Pre Normal


`````js filename=intro
({
  x: [],
} = ``);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = ``;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "".x;
[ ...a ];
$( "bad" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
