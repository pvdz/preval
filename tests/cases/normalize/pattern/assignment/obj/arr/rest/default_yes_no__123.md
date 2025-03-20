# Preval test case

# default_yes_no__123.md

> Normalize > Pattern > Assignment > Obj > Arr > Rest > Default yes no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [...y] = $(['fail']) } = { x: [1, 2, 3], a: 11, b: 12 });
$(y);
`````

## Settled


`````js filename=intro
y = [1, 2, 3];
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
y = [1, 2, 3];
$(y);
`````

## Pre Normal


`````js filename=intro
({ x: [...y] = $([`fail`]) } = { x: [1, 2, 3], a: 11, b: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`fail`];
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
y = arrPatternSplat.slice(0);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
y = [ 1, 2, 3 ];
$( y );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice
