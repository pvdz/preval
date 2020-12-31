# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > obj > arr > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = null,
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault];
$('bad');
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = null.x;
$('bad');
`````
