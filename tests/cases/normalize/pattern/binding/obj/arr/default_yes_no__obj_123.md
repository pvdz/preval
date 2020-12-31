# Preval test case

# default_yes_no__obj_123.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = { x: 1, a: 2, b: 3 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 1, a: 2, b: 3 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 1, a: 2, b: 3 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail']) : objPatternBeforeDefault;
$('ok');
`````
