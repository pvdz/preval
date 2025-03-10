# Preval test case

# default_no_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Arr > Default no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [] } = {};
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = $Object_prototype.x;
[...objPatternNoDefault];
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = $Object_prototype.x;
[...objPatternNoDefault];
$(`bad`);
`````

## Pre Normal


`````js filename=intro
const {
  x: [],
} = {};
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = {};
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
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
