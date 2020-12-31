# Preval test case

# default_yes_no_no__obj_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] } = {};
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = {},
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  arrPatternBeforeDefault = arrPatternSplat[0],
  y = arrPatternBeforeDefault === undefined ? 'fail' : arrPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = {},
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  arrPatternBeforeDefault = arrPatternSplat[0];
$('bad');
`````
