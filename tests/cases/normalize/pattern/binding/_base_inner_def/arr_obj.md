# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [{ x = a }] = [{}];
`````

## Normalized

`````js filename=intro
const tmpArrElement = {};
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = objPatternBeforeDefault;
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
