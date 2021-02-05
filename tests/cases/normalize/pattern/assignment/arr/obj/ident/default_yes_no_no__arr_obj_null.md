# Preval test case

# default_yes_no_no__arr_obj_null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__arr_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('fail') }] = [{ x: null, y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = null;
const tmpArrElement = { x: tmpObjLitVal, y: 2, z: 3 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const tmpArrElement = { x: null, y: 2, z: 3 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
