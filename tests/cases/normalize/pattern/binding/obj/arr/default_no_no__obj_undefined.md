# Preval test case

# default_no_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Arr > Default no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [] } = { x: undefined, a: 11, b: 12 };
$('bad');
`````

## Settled


`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
const {
  x: [],
} = { x: undefined, a: 11, b: 12 };
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: undefined, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...undefined ];
throw "[Preval]: Array spread must crash before this line";
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
