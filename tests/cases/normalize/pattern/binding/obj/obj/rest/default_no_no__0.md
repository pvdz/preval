# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } } = 0;
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (0).x;
const tmpCalleeParam$1 /*:array*/ = [];
$objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest((0).x, [], undefined);
$(`bad`);
`````

## Pre Normal


`````js filename=intro
const {
  x: { ...y },
} = 0;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 0;
const objPatternNoDefault = bindingPatternObjRoot.x;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const y = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
const b = [];
$objPatternRest( a, b, undefined );
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
