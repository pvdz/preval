# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [...y] } = 0;
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (0).x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
arrPatternSplat.slice(0);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = (0).x;
[...objPatternNoDefault].slice(0);
$(`bad`);
`````

## Pre Normal


`````js filename=intro
const {
  x: [...y],
} = 0;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 0;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat.slice(0);
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
const b = [ ...a ];
b.slice( 0 );
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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice
