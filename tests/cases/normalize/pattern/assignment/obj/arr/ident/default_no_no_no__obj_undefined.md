# Preval test case

# default_no_no_no__obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default no no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y] } = { x: undefined, a: 11, b: 12 });
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
({
  x: [y],
} = { x: undefined, a: 11, b: 12 });
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
