# Preval test case

# default_yes_yes_no__undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] = $(['fail2']) } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined,
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail2']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault],
  arrPatternBeforeDefault = arrPatternSplat[0],
  y = arrPatternBeforeDefault === undefined ? 'fail' : arrPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = undefined.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail2']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault];
$('bad');
`````
