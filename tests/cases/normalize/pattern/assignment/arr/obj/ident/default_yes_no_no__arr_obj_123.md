# Preval test case

# default_yes_no_no__arr_obj_123.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes no no  arr obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('fail') }] = [{ x: 1, y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Settled


`````js filename=intro
x = 1;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 1;
$(x);
`````

## Pre Normal


`````js filename=intro
[{ x: x = $(`fail`) }] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: 1, y: 2, z: 3 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`fail`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
x = 1;
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope