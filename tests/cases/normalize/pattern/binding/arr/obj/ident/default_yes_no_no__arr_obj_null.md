# Preval test case

# default_yes_no_no__arr_obj_null.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default yes no no  arr obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ x = $('fail') }] = [{ x: null, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Pre Normal


`````js filename=intro
const [{ x: x = $(`fail`) }] = [{ x: null, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: null, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`fail`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output


`````js filename=intro
$(null);
`````

## PST Output

With rename=true

`````js filename=intro
$( null );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
