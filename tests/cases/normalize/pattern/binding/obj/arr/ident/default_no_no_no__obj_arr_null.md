# Preval test case

# default_no_no_no__obj_arr_null.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__obj_arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = { x: [null], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: [null], a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  y = arrPatternSplat[0];
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: [null], a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  y = arrPatternSplat[0];
$(y);
`````
