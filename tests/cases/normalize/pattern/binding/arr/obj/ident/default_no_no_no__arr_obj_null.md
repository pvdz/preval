# Preval test case

# default_no_no_no__arr_obj_null.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x }] = [{ x: null, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = null;
const tmpArrElement = { x: tmpObjLitVal, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
