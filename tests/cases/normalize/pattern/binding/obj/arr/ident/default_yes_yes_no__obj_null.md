# Preval test case

# default_yes_yes_no__obj_null.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] = $(['fail2']) } = { x: null, a: 11, b: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: null, a: 11, b: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail2']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault],
  arrPatternBeforeDefault = arrPatternSplat[0],
  y = arrPatternBeforeDefault === undefined ? 'fail' : arrPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: null, a: 11, b: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['fail2']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault],
  arrPatternBeforeDefault = arrPatternSplat[0];
$('bad');
`````
