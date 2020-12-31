# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > obj > arr > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = 1;
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1,
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault];
$('ok');
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (1).x;
$('ok');
`````
