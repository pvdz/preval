# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] = $(['pass2']) } = 'abc';
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 'abc',
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['pass2']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault],
  arrPatternBeforeDefault = arrPatternSplat[0],
  y = arrPatternBeforeDefault === undefined ? 'fail' : arrPatternBeforeDefault;
$(y);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = 'abc'.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $(['pass2']) : objPatternBeforeDefault,
  arrPatternSplat = [...objPatternAfterDefault],
  arrPatternBeforeDefault = arrPatternSplat[0],
  y = arrPatternBeforeDefault === undefined ? 'fail' : arrPatternBeforeDefault;
$(y);
`````
