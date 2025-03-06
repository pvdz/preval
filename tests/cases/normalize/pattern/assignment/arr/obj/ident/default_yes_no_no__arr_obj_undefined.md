# Preval test case

# default_yes_no_no__arr_obj_undefined.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes no no  arr obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('pass') }] = [{ x: undefined, y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Pre Normal


`````js filename=intro
[{ x: x = $(`pass`) }] = [{ x: undefined, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: undefined, y: 2, z: 3 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output


`````js filename=intro
x = $(`pass`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = $( "pass" );
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope