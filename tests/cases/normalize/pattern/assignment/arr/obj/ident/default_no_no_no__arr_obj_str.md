# Preval test case

# default_no_no_no__arr_obj_str.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x }] = [{ x: 'abc', y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = { x: 'abc', y: 2, z: 3 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
