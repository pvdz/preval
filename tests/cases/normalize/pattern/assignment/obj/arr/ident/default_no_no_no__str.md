# Preval test case

# default_no_no_no__str.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default no no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y] } = 'abc');
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = `abc`.x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = `abc`.x;
y = [...objPatternNoDefault][0];
$(`bad`);
`````

## Pre Normal


`````js filename=intro
({
  x: [y],
} = `abc`);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = `abc`;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "abc".x;
const b = [ ...a ];
y = b[ 0 ];
$( "bad" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Post settled calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Denormalized calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope