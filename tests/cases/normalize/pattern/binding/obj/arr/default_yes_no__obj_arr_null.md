# Preval test case

# default_yes_no__obj_arr_null.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = { x: [null], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: [null], a: 11, b: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: [null], a: 11, b: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail']) : objPatternBeforeDefault;
$('ok');
`````
